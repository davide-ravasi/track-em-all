import { test, expect } from "@playwright/test";

test("test home page main components", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveTitle("Track'em All");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});
