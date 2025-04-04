import { Page } from "@playwright/test";

import { ApplicationWizard } from "../fragments/ApplicationWizard";
import BasePage from "./BasePage";

class NewApplicationPage extends BasePage {
  applicationWizard: ApplicationWizard;

  constructor(page: Page) {
    super(page, "/applications/new");
    this.applicationWizard = new ApplicationWizard(page);
  }

  async open(): Promise<NewApplicationPage> {
    await super.open();

    return this;
  }
}

export default NewApplicationPage;
