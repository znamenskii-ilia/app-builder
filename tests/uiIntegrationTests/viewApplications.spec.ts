import { expect, test } from "@playwright/test";

import ApplicationsPage from "../pageObjects/pages/ApplicationsPage";
import { makeApplicationDto } from "../factories/applicationManagement/ApplicationDto.factory";

test("when application failed to load", async ({ page }) => {
  // TODO: Replace with real API endpoint
  await page.route("https://jsonplaceholder.typicode.com/comments*", async (route) => {
    await route.fulfill({ status: 500 });
  });

  const applicationsPage = new ApplicationsPage(page);
  const { applicationList } = await applicationsPage.open();

  await expect(applicationList.get()).toHaveText("Failed to load applications");
});

test("when user has no applications", async ({ page }) => {
  // TODO: Replace with real API endpoint
  await page.route("https://jsonplaceholder.typicode.com/comments*", async (route) => {
    await route.fulfill({ json: [] });
  });

  const applicationsPage = new ApplicationsPage(page);
  const { applicationList } = await applicationsPage.open();

  await expect(applicationList.get()).toHaveText("You have no applications yet");
});

test("when user has some applications", async ({ page }) => {
  const dtos = [
    makeApplicationDto({ lastModified: new Date("2025-04-02").getTime() }),
    makeApplicationDto({ lastModified: new Date("2025-04-01").getTime() }),
  ];
  // TODO: Replace with real API endpoint
  await page.route("https://jsonplaceholder.typicode.com/comments*", async (route) => {
    await route.fulfill({ json: dtos });
  });

  const applicationsPage = new ApplicationsPage(page);
  const { applicationList } = await applicationsPage.open();
  await applicationList.waitForLoading();

  const applicationItems = await applicationList.getItems();
  await expect(applicationItems).toHaveLength(2);

  const expectedTimes = ["Apr 2, 2025", "Apr 1, 2025"];
  for (const [index, dto] of dtos.entries()) {
    const item = applicationItems[index];

    await expect(item.getByRole("heading", { level: 2 })).toHaveText(dto.name);
    await expect(item.getByRole("paragraph")).toHaveText(dto.description);
    await expect(item.getByRole("time")).toHaveText(expectedTimes[index]);
    await expect(item.getByRole("link")).toHaveAttribute(`href`, `/applications/${dto.id}`);
  }
});
