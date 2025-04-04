import { Page } from "@playwright/test";

import ApplicationListFragment from "../fragments/ApplicationList";
import BasePage from "./BasePage";

class NewApplicationPage extends BasePage {
  applicationList: ApplicationListFragment;

  constructor(page: Page) {
    super(page, "/applications/new");
  }

  async open(): Promise<NewApplicationPage> {
    await super.open();

    return this;
  }
}

export default NewApplicationPage;
