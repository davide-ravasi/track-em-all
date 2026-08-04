import { test, expect } from '@playwright/test';

test.describe('test show page', () => {
  test('should show the show page and its main components', async ({
    page,
  }) => {
    await page.goto('/show/1396');
    await expect(page).toHaveTitle("Track'em All");
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();

    // Show Details
    await expect(
      page.getByRole('heading', { name: /breaking bad/i })
    ).toBeVisible();
    await expect(
      page.getByRole('img', { name: /breaking bad backdrop/i })
    ).toBeVisible();

    const button = page.getByRole('button', { name: /show all the episodes/i });
    await expect(button).toBeVisible();

    await button.click();
    await expect(page.getByTestId('seasons-list')).toBeVisible();
    const seasons = page
      .getByTestId('seasons-list')
      .getByRole('heading', { name: /season/i });
    await expect(seasons).toHaveCount(5);
    await expect(seasons.first()).toHaveText('Season 1');
    await expect(seasons.last()).toHaveText('Season 5');

    const seasonFirst = page.getByTestId('season-1');
    await expect(seasonFirst).toBeVisible();
    const episodes = seasonFirst.getByRole('article');
    await expect(episodes).toHaveCount(7);
  });
});
