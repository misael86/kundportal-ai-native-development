import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CaseForm } from './CaseForm';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('CaseForm', () => {
  it('[CASE-CREATE-007, UI-CONSISTENCY-002] displays a readable API validation error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Rubrik måste anges.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    const user = userEvent.setup();

    render(<CaseForm onCreated={vi.fn()} />);
    await user.type(screen.getByRole('textbox', { name: 'Rubrik' }), 'Ärende');
    await user.type(screen.getByRole('textbox', { name: 'Beskrivning' }), 'Beskrivning');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Kategori' }), 'Tekniskt');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Prioritet' }), 'Hög');
    await user.click(screen.getByRole('button', { name: 'Skapa ärende' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Rubrik måste anges.');
  });
});
