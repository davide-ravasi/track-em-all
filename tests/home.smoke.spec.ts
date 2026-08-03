import { test, expect } from '@playwright/test';

test.describe('test home page', () => {
  test('test home page main components', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Track'em All");
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // TV Shows
    const sectionTvShows = page.getByTestId('section-tv-shows');
    await expect(sectionTvShows).toBeVisible();
    await expect(
      sectionTvShows.getByRole('heading', { name: /popular tv shows/i })
    ).toBeVisible();
    await expect(sectionTvShows.getByRole('article')).toHaveCount(6);

    // Top Rated
    const sectionTopRated = page.getByTestId('section-top-rated');
    await expect(sectionTopRated).toBeVisible();
    await expect(
      sectionTopRated.getByRole('heading', { name: /top rated tv shows/i })
    ).toBeVisible();
    await expect(sectionTopRated.getByRole('article')).toHaveCount(6);

    // Most Popular Actors
    const sectionMostPopularActors = page.getByTestId('section-person-popular');
    await expect(sectionMostPopularActors).toBeVisible();
    await expect(
      sectionMostPopularActors.getByRole('heading', {
        name: /most popular actors/i,
      })
    ).toBeVisible();
    await expect(sectionMostPopularActors.getByRole('article')).toHaveCount(6);
  });
});

test.describe('test home page search functionality', () => {
  test('test home page search functionality', async ({ page }) => {
    await page.goto('/');
    // SearchBar basics (no TMDB dependency):
    // - empty submit: no navigation / no state switch
    // - non-empty submit: hide the home sections and enter "Search results" view
    const searchInput = page.getByRole('searchbox', {
      name: /search tv shows/i,
    });
    const searchSubmit = page.getByRole('button', { name: /submit search/i });
    await expect(searchInput).toBeVisible();
    await expect(searchSubmit).toBeVisible();

    const homeTvSection = page.getByTestId('section-tv-shows');

    // 1) empty submit should keep home sections visible
    await searchInput.fill('');
    await searchSubmit.click();
    await expect(homeTvSection).toHaveCount(1);
    await expect(homeTvSection).toBeVisible();

    // 2) non-empty submit should switch away from home sections
    await searchInput.fill('breaking bad');
    await searchSubmit.click();
    await expect(homeTvSection).toHaveCount(0);

    const sectionSearchResults = page.getByTestId('section-search-results');
    await expect(sectionSearchResults).toBeVisible();
    await expect(
      sectionSearchResults.getByRole('heading', { name: /search results/i })
    ).toBeVisible();
  });
});
