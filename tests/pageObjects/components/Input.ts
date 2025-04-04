import { Locator, Page } from "@playwright/test";

import BaseComponent from "./BaseComponent";

export class Input extends BaseComponent {
  private label: string;

  constructor(page: Page, label: string) {
    super(page);
    this.label = label;
  }

  get(): Locator {
    return this.page.getByLabel(this.label);
  }
}
