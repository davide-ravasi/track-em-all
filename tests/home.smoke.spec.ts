import { test, expect } from "@playwright/test";

test("test home page main components", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Track'em All");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  // TV Shows
  const sectionTvShows = await page.getByTestId("section-tv-shows");
  await expect(sectionTvShows).toBeVisible();
  await expect(
    sectionTvShows.getByRole("heading", { name: /popular tv shows/i })
  ).toBeVisible();
  await expect(sectionTvShows.getByRole("article")).toHaveCount(6);

  // Top Rated
  const sectionTopRated = await page.getByTestId("section-top-rated");
  await expect(sectionTopRated).toBeVisible();
  await expect(
    sectionTopRated.getByRole("heading", { name: /top rated tv shows/i })
  ).toBeVisible();
  await expect(sectionTopRated.getByRole("article")).toHaveCount(6);

  // Most Popular Actors
  const sectionMostPopularActors = await page.getByTestId(
    "section-person-popular"
  );
  await expect(sectionMostPopularActors).toBeVisible();
  await expect(
    sectionMostPopularActors.getByRole("heading", {
      name: /most popular actors/i,
    })
  ).toBeVisible();
  await expect(sectionMostPopularActors.getByRole("article")).toHaveCount(6);
});
