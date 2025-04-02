import { Page } from "@playwright/test";

abstract class BasePage {
  private page: Page;
  private path: string;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async open(): Promise<BasePage> {
    await this.page.goto(this.path);

    return this;
  }

  async getDocumentTitle(): Promise<string> {
    return this.page.title();
  }
}

export default BasePage;
