import { Locator, Page } from "@playwright/test";

abstract class BaseFragment {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract get(): Locator;
}

export default BaseFragment;
