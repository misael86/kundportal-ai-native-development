import type { Locator, Page } from '@playwright/test';

export class CasePortalPage {
  constructor(private readonly page: Page, private readonly baseURL: string) {}

  get titleField(): Locator {
    return this.page.getByLabel('Rubrik');
  }

  get descriptionField(): Locator {
    return this.page.getByLabel('Beskrivning');
  }

  get categoryField(): Locator {
    return this.page.getByLabel('Kategori');
  }

  get priorityField(): Locator {
    return this.page.getByLabel('Prioritet');
  }

  get createButton(): Locator {
    return this.page.getByRole('button', { name: 'Skapa ärende' });
  }

  get createConfirmation(): Locator {
    return this.page.getByRole('status').filter({ hasText: 'Ärende skapat:' });
  }

  get emptyState(): Locator {
    return this.page.getByText('Inga ärenden ännu.');
  }

  get caseList(): Locator {
    return this.page.getByRole('list', { name: 'Ärenden' });
  }

  get caseItems(): Locator {
    return this.caseList.getByRole('listitem');
  }

  async goto() {
    await this.page.goto(this.baseURL);
  }

  async createCase(title: string, description: string, category: string, priority: string) {
    await this.titleField.fill(title);
    await this.descriptionField.fill(description);
    await this.categoryField.selectOption(category);
    await this.priorityField.selectOption(priority);
    await this.createButton.click();
  }

  caseItem(title: string): Locator {
    return this.caseItems.filter({ hasText: title });
  }

  async openCase(title: string) {
    await this.caseItem(title).getByRole('button', { name: title }).click();
  }

  caseDetail(title: string): Locator {
    return this.page.getByRole('region', { name: title });
  }

  statusField(title: string): Locator {
    return this.caseDetail(title).getByLabel('Ändra status');
  }

  statusSaveButton(title: string): Locator {
    return this.caseDetail(title).getByRole('button', { name: 'Spara status' });
  }

  statusConfirmation(title: string): Locator {
    return this.caseDetail(title).getByRole('status');
  }

  async saveStatus(title: string, status: string) {
    await this.statusField(title).selectOption(status);
    await this.statusSaveButton(title).click();
  }

  noteField(title: string): Locator {
    return this.caseDetail(title).getByLabel('Intern anteckning');
  }

  noteSaveButton(title: string): Locator {
    return this.caseDetail(title).getByRole('button', { name: 'Spara anteckning' });
  }

  noteConfirmation(title: string): Locator {
    return this.caseDetail(title).getByRole('status');
  }

  async saveNote(title: string, note: string) {
    await this.noteField(title).fill(note);
    await this.noteSaveButton(title).click();
  }
}
