import { Locator, Page } from "@playwright/test";

import BaseComponent from "./BaseComponent";
import { Input } from "./Input";

export class ApplicationDataStep extends BaseComponent {
  nameInput: Input;
  descriptionInput: Input;

  constructor(page: Page) {
    super(page);
    this.nameInput = new Input(page, "Name");
    this.descriptionInput = new Input(page, "Description");
  }

  get(): Locator {
    return this.page.getByTestId("application-data-step");
  }

  async waitFor() {
    await this.nameInput.get().waitFor();
    await this.descriptionInput.get().waitFor();
  }

  async fillName(name: string) {
    await this.nameInput.get().fill(name);
  }

  async fillDescription(description: string) {
    await this.descriptionInput.get().fill(description);
  }

  async save() {
    await this.get().getByRole("button", { name: "Save" }).click();
  }
}
