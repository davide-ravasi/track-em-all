import { test, expect } from '@playwright/test';

test.describe('listing page', () => {
  test('should show the listing page and its main components', async ({
    page,
  }) => {
    await page.goto('/list/tv/popular');
    await expect(page).toHaveTitle("Track'em All");
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // TV Shows
    const sectionTvShows = page.getByTestId('section-tv');
    await expect(sectionTvShows).toBeVisible();
    await expect(
      sectionTvShows.getByRole('heading', { name: /your popular shows/i })
    ).toBeVisible();
    await expect(sectionTvShows.getByRole('article')).toHaveCount(20);
  });

  test("should show more shows when clicking on the 'Show More' button", async ({
    page,
  }) => {
    await page.goto('/list/tv/popular');

    const sectionTvShows = page.getByTestId('section-tv');
    const showMoreButton = page.getByRole('button', {
      name: /Load more your popular shows/i,
    });
    await expect(showMoreButton).toBeVisible();
    await showMoreButton.click();
    await expect(sectionTvShows.getByRole('article')).toHaveCount(40);
  });
});
