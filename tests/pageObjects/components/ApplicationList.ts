import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

class ApplicationList extends BaseComponent {
  get(): Locator {
    return this.page.getByTestId("application-list");
  }

  getItems(): Promise<Locator[]> {
    return this.get().getByRole("listitem").all();
  }
}

export default ApplicationList;
