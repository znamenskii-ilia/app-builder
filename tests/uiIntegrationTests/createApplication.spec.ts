import { expect, test } from "@playwright/test";
import NewApplicationPage from "../pageObjects/pages/NewApplicationPage";

[
  { type: "web", template: "blank" },
  { type: "web", template: "blog" },
  { type: "mobile", template: "blank" },
  { type: "email", template: "blank" },
].forEach(({ type, template }) => {
  test(`create ${type} ${template} application`, async ({ page }) => {
    page.route("https://jsonplaceholder.typicode.com/posts", async (route) => {
      return route.fulfill({
        json: {
          id: "123",
        },
      });
    });
    const { applicationWizard } = await new NewApplicationPage(page).open();

    await expect(applicationWizard.getCurrentStepTitle()).toHaveText("Type");

    applicationWizard.selectType(type);

    await expect(applicationWizard.getCurrentStepTitle()).toHaveText("Template");

    applicationWizard.selectTemplate(template);

    await expect(applicationWizard.getCurrentStepTitle()).toHaveText("Name and Description");

    await applicationWizard.fillName("My Application");
    await applicationWizard.fillDescription("My Application Description");
    await applicationWizard.applicationDataStep.save();

    await expect(page, "Application page should be opened").toHaveURL("/applications/123");
  });
});
