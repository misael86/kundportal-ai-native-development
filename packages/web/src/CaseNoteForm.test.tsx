import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CaseNoteForm } from './CaseNoteForm';

const caseItem = {
  id: 7,
  title: 'Fiktivt ärende',
  description: 'En fiktiv beskrivning.',
  category: 'Konto',
  priority: 'Normal',
  status: 'Nytt',
  createdAt: '2026-02-01T10:00:00.000Z',
  note: null
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('CaseNoteForm', () => {
  it.each([
    { status: 400, error: 'Anteckningen får innehålla högst 2000 tecken.', requirement: 'CASE-NOTE-005' },
    { status: 404, error: 'Ärendet hittades inte.', requirement: 'CASE-NOTE-006' },
    { status: 500, error: 'Anteckningen kunde inte sparas. Försök igen.', requirement: 'CASE-NOTE-003' }
  ])('[$requirement] reports HTTP $status', async ({ status, error }) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error }, status)));
    const user = userEvent.setup();
    render(<CaseNoteForm caseItem={caseItem} onUpdated={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(error);
  });

  it('[CASE-NOTE-003] prevents duplicate saves while waiting for the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise<Response>(() => {})));
    const user = userEvent.setup();
    render(<CaseNoteForm caseItem={caseItem} onUpdated={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));

    expect(screen.getByRole('button', { name: 'Sparar anteckning…' })).toBeDisabled();
  });

  it('[CASE-NOTE-003] keeps the draft after a network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network unavailable')));
    const user = userEvent.setup();
    render(<CaseNoteForm caseItem={caseItem} onUpdated={vi.fn()} />);
    await user.type(screen.getByRole('textbox', { name: 'Intern anteckning' }), 'Behåll utkast.');
    await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));
    await screen.findByRole('alert');

    expect(screen.getByRole('textbox', { name: 'Intern anteckning' })).toHaveValue('Behåll utkast.');
  });

  it('[CASE-NOTE-003] allows retrying a failed save', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockRejectedValueOnce(new Error('Network unavailable'))
      .mockResolvedValueOnce(jsonResponse({ ...caseItem, note: 'Text.' })));
    const user = userEvent.setup();
    render(<CaseNoteForm caseItem={caseItem} onUpdated={vi.fn()} />);
    await user.type(screen.getByRole('textbox', { name: 'Intern anteckning' }), 'Text.');
    await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));
    await screen.findByRole('alert');
    await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Anteckning sparad.');
  });

  it.each([{ ...caseItem, id: 8 }, { ...caseItem, note: 42 }, { id: 7 }])(
    '[CASE-NOTE-003] reports invalid saved-case data %j',
    async (body) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(body)));
      const user = userEvent.setup();
      render(<CaseNoteForm caseItem={caseItem} onUpdated={vi.fn()} />);
      await user.click(screen.getByRole('button', { name: 'Spara anteckning' }));

      expect(await screen.findByRole('alert')).toHaveTextContent('Anteckningen kunde inte sparas. Försök igen.');
    }
  );
});
