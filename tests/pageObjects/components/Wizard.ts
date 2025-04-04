import { Locator } from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class Wizard extends BaseComponent {
  get(): Locator {
    return this.page.getByTestId("wizard");
  }

  getNav(): Locator {
    return this.get().getByRole("navigation");
  }

  getCurrentStep(): Locator {
    return this.getNav()
      .getByRole("listitem")
      .filter({ has: this.page.locator("[aria-current='step']") });
  }
}
