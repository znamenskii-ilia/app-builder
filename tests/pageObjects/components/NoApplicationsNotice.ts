import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

class NoApplicationsNotice extends BaseComponent {
  get(): Locator {
    return this.page.getByTestId("no-applications-notice");
  }
}

export default NoApplicationsNotice;
