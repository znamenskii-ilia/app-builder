import { Page } from "@playwright/test";

import ApplicationListFragment from "../fragments/ApplicationList";
import BasePage from "./BasePage";

class ApplicationsPage extends BasePage {
  applicationList: ApplicationListFragment;

  constructor(page: Page) {
    super(page, "/applications");
    this.applicationList = new ApplicationListFragment(page);
  }

  async open(): Promise<ApplicationsPage> {
    await super.open();

    return this;
  }
}

export default ApplicationsPage;
