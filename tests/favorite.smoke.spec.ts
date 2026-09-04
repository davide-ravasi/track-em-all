import { test, expect } from '@playwright/test';

test.describe('favorite page', () => {
  test('should redirect to login page when not logged in', async ({ page }) => {
    await page.goto('/favorites');
    await expect(page).toHaveTitle("Track'em All");
    await expect(page).toHaveURL('/login');
  });

  test('should show the favorite page when logged in with no favorites', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'persist:root',
        JSON.stringify({
          auth: JSON.stringify({
            user: {
              id: '123',
              email: 'test@test.com',
              firstName: 'Test',
              lastName: 'Test',
            },
            favorites: [],
            isLoading: false,
            isSuccess: false,
            isError: false,
            message: '',
          }),
        })
      );
    });

    await page.goto('/favorites');
    await expect(page).toHaveTitle("Track'em All");
    await expect(
      page.getByRole('heading', { name: 'Your Favorite Shows' })
    ).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // Favorite Shows
    const favorites = page.getByRole('article');
    await expect(favorites).toHaveCount(0);
    await expect(page.getByText(/haven't added any favorite/i)).toBeVisible();
  });

  test('should show the favorite page when logged in with 2 favorites', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'persist:root',
        JSON.stringify({
          auth: JSON.stringify({
            user: {
              id: '123',
              email: 'test@test.com',
              firstName: 'Test',
              lastName: 'Test',
            },
            favorites: [
              {
                name: 'Test 1',
                vote_average: 5,
                poster_path: 'https://via.placeholder.com/150',
                showId: '123',
              },
              {
                name: 'Test 2',
                vote_average: 5,
                poster_path: 'https://via.placeholder.com/150',
                showId: '125',
              },
            ],
            isLoading: false,
            isSuccess: false,
            isError: false,
            message: '',
          }),
        })
      );
    });

    await page.goto('/favorites');
    await expect(page).toHaveTitle("Track'em All");
    await expect(
      page.getByRole('heading', { name: 'Your Favorite Shows' })
    ).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // Favorite Shows
    const favorites = page.getByRole('article');
    await expect(favorites).toHaveCount(2);
    await expect(
      favorites.nth(0).getByAltText('Poster for Test 1')
    ).toBeVisible();
    await expect(
      favorites.nth(1).getByAltText('Poster for Test 2')
    ).toBeVisible();
    await expect(
      favorites.nth(0).locator('p').getByText('Test 1')
    ).toBeVisible();
    await expect(
      favorites.nth(1).locator('p').getByText('Test 2')
    ).toBeVisible();
  });
});
