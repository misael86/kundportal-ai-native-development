import { expect, test } from '@playwright/test';
import { CasePortalPage } from './pages/CasePortalPage';
import { startIsolatedApp, type IsolatedApp } from './start-app';

const categories = ['Konto', 'Fakturering', 'Tekniskt', 'Övrigt'];
const priorities = ['Låg', 'Normal', 'Hög'];
const statuses = ['Nytt', 'Pågående', 'Väntar på kund', 'Avslutat'];

let app: IsolatedApp | undefined;

function requireApp(): IsolatedApp {
  if (!app) {
    throw new Error('The isolated Playwright app has not been started.');
  }
  return app;
}

test.beforeEach(async () => {
  app = await startIsolatedApp();
});

test.afterEach(async () => {
  await app?.close();
  app = undefined;
});

test('[CASE-LIST-002] visar tomläge och [UI-CONSISTENCY-001] fältetiketter', async ({ page }) => {
  const portal = new CasePortalPage(page, requireApp().baseURL);
  await portal.goto();

  await expect(portal.emptyState).toBeVisible();
  for (const field of [portal.titleField, portal.descriptionField, portal.categoryField, portal.priorityField]) {
    await expect(field).toBeVisible();
    await expect(field).toHaveJSProperty('required', true);
  }
});

test(
  '[CASE-CREATE-001, CASE-CREATE-002, CASE-CREATE-003, CASE-CREATE-004, CASE-CREATE-005, CASE-CREATE-006, CASE-CREATE-008, UI-CONSISTENCY-001] skapar och återläser ett fullständigt ärende',
  async ({ page }) => {
    const portal = new CasePortalPage(page, requireApp().baseURL);
    await portal.goto();

    const titleInput = portal.titleField;
    const descriptionInput = portal.descriptionField;
    const categorySelect = portal.categoryField;
    const prioritySelect = portal.priorityField;
    const title = `${' '.repeat(2)}${'Ä'.repeat(116)}${' '.repeat(2)}`;
    const description = ` ${'D'.repeat(1998)} `;
    const savedTitle = title.trim();
    const savedDescription = description.trim();

    await expect(titleInput).toHaveJSProperty('required', true);
    await expect(titleInput).toHaveAttribute('maxLength', '120');
    await expect(descriptionInput).toHaveJSProperty('required', true);
    await expect(descriptionInput).toHaveAttribute('maxLength', '2000');
    await expect(categorySelect).toHaveJSProperty('required', true);
    await expect(categorySelect.locator('option:not([disabled])')).toHaveText(categories);
    await expect(prioritySelect).toHaveJSProperty('required', true);
    await expect(prioritySelect.locator('option:not([disabled])')).toHaveText(priorities);

    await portal.createCase(title, description, 'Tekniskt', 'Hög');

    await expect(portal.createConfirmation).toContainText(savedTitle);
    const listItem = portal.caseItem(savedTitle);
    await expect(listItem).toContainText('Tekniskt');
    await expect(listItem).toContainText('Hög');
    await expect(listItem).toContainText('Nytt');

    await portal.openCase(savedTitle);
    const detail = portal.caseDetail(savedTitle);
    await expect(detail).toContainText(savedDescription);
    await expect(detail).toContainText('Nytt');
    await expect(detail.locator('time')).toHaveAttribute('datetime', /^\d{4}-\d\d-\d\dT/);
    await expect(portal.statusField(savedTitle)).toBeVisible();
    await expect(portal.noteField(savedTitle)).toHaveValue('');

    await page.reload();
    await portal.openCase(savedTitle);
    await expect(portal.caseDetail(savedTitle)).toContainText(savedDescription);
  }
);

test('[CASE-LIST-001] visar ärenden nyast först med sammanfattande fält', async ({ page }) => {
  const portal = new CasePortalPage(page, requireApp().baseURL);
  await portal.goto();
  await portal.createCase('Fiktivt äldre testärende', 'Fiktivt testärende för Playwright.', 'Tekniskt', 'Hög');
  await expect(portal.createConfirmation).toContainText('Fiktivt äldre testärende');
  await portal.createCase('Fiktivt nyare testärende', 'Fiktivt testärende för Playwright.', 'Tekniskt', 'Hög');
  await expect(portal.createConfirmation).toContainText('Fiktivt nyare testärende');

  await expect(portal.caseItems).toHaveCount(2);
  await expect(portal.caseItems.nth(0)).toContainText('Fiktivt nyare testärende');
  await expect(portal.caseItems.nth(0)).toContainText('Tekniskt');
  await expect(portal.caseItems.nth(0)).toContainText('Hög');
  await expect(portal.caseItems.nth(0)).toContainText('Nytt');
  await expect(portal.caseItems.nth(1)).toContainText('Fiktivt äldre testärende');
});

test('[CASE-DETAIL-001] visar valt ärendes detaljer och [UI-CONSISTENCY-003] status som text', async ({ page }) => {
  const portal = new CasePortalPage(page, requireApp().baseURL);
  await portal.goto();
  await portal.createCase('Fiktivt detaljtest', 'Fiktivt testärende för Playwright.', 'Tekniskt', 'Hög');
  await expect(portal.createConfirmation).toContainText('Fiktivt detaljtest');
  await portal.openCase('Fiktivt detaljtest');

  const detail = portal.caseDetail('Fiktivt detaljtest');
  await expect(detail).toContainText('Fiktivt testärende för Playwright.');
  await expect(detail).toContainText('Tekniskt');
  await expect(detail).toContainText('Hög');
  await expect(detail.locator('dd .case-status')).toHaveText('Nytt');
});

test('[CASE-STATUS-001, CASE-STATUS-003] sparar status i detalj och lista efter omläsning', async ({ page }) => {
  const portal = new CasePortalPage(page, requireApp().baseURL);
  await portal.goto();
  await portal.createCase('Fiktivt statustest', 'Fiktivt testärende för Playwright.', 'Tekniskt', 'Hög');
  await expect(portal.createConfirmation).toContainText('Fiktivt statustest');
  await portal.openCase('Fiktivt statustest');

  const statusSelect = portal.statusField('Fiktivt statustest');
  await expect(statusSelect.locator('option')).toHaveText(statuses);
  await expect(statusSelect).toHaveValue('Nytt');
  await portal.saveStatus('Fiktivt statustest', 'Avslutat');
  await expect(portal.statusConfirmation('Fiktivt statustest')).toHaveText('Status sparad.');
  await expect(portal.caseItem('Fiktivt statustest')).toContainText('Avslutat');

  await page.reload();
  await portal.openCase('Fiktivt statustest');
  await expect(portal.statusField('Fiktivt statustest')).toHaveValue('Avslutat');
});

test(
  '[CASE-NOTE-001, CASE-NOTE-002, CASE-NOTE-003, CASE-NOTE-004] lägger till, redigerar och raderar anteckning beständigt',
  async ({ page }) => {
    const portal = new CasePortalPage(page, requireApp().baseURL);
    await portal.goto();
    await portal.createCase(
      'Fiktivt anteckningstest',
      'Fiktivt testärende för Playwright.',
      'Tekniskt',
      'Hög'
    );
    await expect(portal.createConfirmation).toContainText('Fiktivt anteckningstest');
    await portal.openCase('Fiktivt anteckningstest');

    const note = portal.noteField('Fiktivt anteckningstest');
    await expect(note).toHaveValue('');
    await expect(note).toHaveAttribute('maxLength', '2000');
    const maximumNote = ` ${'N'.repeat(1998)} `;
    await portal.saveNote('Fiktivt anteckningstest', maximumNote);
    await expect(portal.noteConfirmation('Fiktivt anteckningstest')).toHaveText('Anteckning sparad.');
    await expect(note).toHaveValue(maximumNote.trim());

    await page.reload();
    await portal.openCase('Fiktivt anteckningstest');
    const reloadedNote = portal.noteField('Fiktivt anteckningstest');
    await expect(reloadedNote).toHaveValue(maximumNote.trim());
    await portal.saveNote('Fiktivt anteckningstest', 'Redigerad intern testanteckning');
    await expect(reloadedNote).toHaveValue('Redigerad intern testanteckning');

    await page.reload();
    await portal.openCase('Fiktivt anteckningstest');
    const editedNote = portal.noteField('Fiktivt anteckningstest');
    await expect(editedNote).toHaveValue('Redigerad intern testanteckning');
    await portal.saveNote('Fiktivt anteckningstest', '   ');
    await expect(portal.noteConfirmation('Fiktivt anteckningstest')).toHaveText('Anteckning raderad.');
    await expect(editedNote).toHaveValue('');

    await page.reload();
    await portal.openCase('Fiktivt anteckningstest');
    await expect(portal.noteField('Fiktivt anteckningstest')).toHaveValue('');
  }
);
