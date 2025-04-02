import { Locator, Page } from "@playwright/test";

import ApplicationList from "../components/ApplicationList";
import BaseFragment from "./BaseFragment";

class ApplicationListFragment extends BaseFragment {
  private applicationList: ApplicationList;

  constructor(page: Page) {
    super(page);
    this.applicationList = new ApplicationList(page);
  }

  get(): Locator {
    return this.page.getByTestId("application-list-fragment");
  }

  waitForLoading(): Promise<void> {
    const locator = this.applicationList.get();

    return locator.waitFor();
  }

  getItems(): Promise<Locator[]> {
    return this.applicationList.getItems();
  }
}

export default ApplicationListFragment;
