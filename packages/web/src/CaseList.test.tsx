import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CaseList } from './CaseList';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('CaseList', () => {
  it('[CASE-LIST-003] shows an error instead of an empty state when loading fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network unavailable')));

    render(<CaseList />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Ärendena kunde inte hämtas.');
    expect(screen.queryByText('Inga ärenden ännu.')).not.toBeInTheDocument();
  });
});
