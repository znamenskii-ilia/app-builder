import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class ApplicationTypeStep extends BaseComponent {
  get(): Locator {
    return this.page.getByTestId("application-type-step");
  }

  select(applicationType: string) {
    this.get().getByLabel(applicationType).click();
  }
}
