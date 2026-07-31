import { test, expect } from '@playwright/test';

test.describe('test show page', () => {
  test('test show page main components', async ({ page }) => {
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

    await expect(
      page.getByRole('button', { name: /show all the episodes/i })
    ).toBeVisible();
  });
});
