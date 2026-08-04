import { test, expect } from '@playwright/test';

test.describe('test person page', () => {
  test('should show the person page and its main components', async ({
    page,
  }) => {
    await page.goto('/person/123');
    await expect(page).toHaveTitle("Track'em All");
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();

    // Person Details
    await expect(
      page.getByRole('heading', { name: /biography/i })
    ).toBeVisible();

    // Photos
    const photosSection = page.getByTestId('section-photos');
    const photosHeading = photosSection.getByRole('heading', { name: /photos/i });
    const noPhotosText = page.getByText(/No photos available\.?/i);

    // Avoid `isVisible()` races: wait for one of the stable UI outcomes.
    try {
      await expect(photosHeading).toBeVisible({ timeout: 5000 });
      await expect(photosSection.getByRole('img').first()).toBeVisible();
    } catch {
      await expect(noPhotosText).toBeVisible();
    }

    // Related
    const relatedSection = page.getByTestId('section-related');
    await expect(relatedSection).toBeVisible();
    await expect(
      relatedSection.getByRole('heading', { name: /related/i })
    ).toBeVisible();
    await expect(relatedSection.getByText('Coming soon')).toBeVisible();
  });
});
