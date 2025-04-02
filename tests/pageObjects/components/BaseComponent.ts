import { Locator, Page } from "@playwright/test";

abstract class BaseComponent {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract get(): Locator;
}

export default BaseComponent;
