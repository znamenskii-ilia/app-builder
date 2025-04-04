import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class ApplicationTemplateStep extends BaseComponent {
  get(): Locator {
    return this.page.getByTestId("application-template-step");
  }

  select(applicationTemplate: string) {
    this.get().getByLabel(applicationTemplate).click();
  }
}
