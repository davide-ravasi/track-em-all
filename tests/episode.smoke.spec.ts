import { test, expect } from '@playwright/test';

test.describe('episode page', () => {
  test('should show the episode page and its main components', async ({
    page,
  }) => {
    await page.goto('/show/1396');
    const button = page.getByRole('button', { name: /show all the episodes/i });
    await expect(button).toBeVisible();

    await button.click();
    await expect(page.getByTestId('seasons-list')).toBeVisible();

    const firstSeason = page.getByTestId('season-1');

    // go to the first episode of the first season
    const firstSeasonEpisodes = firstSeason.getByRole('article');
    await expect(firstSeasonEpisodes).toHaveCount(7);

    const firstEpisode = firstSeasonEpisodes.first();
    await expect(firstEpisode).toBeVisible();
    const link = firstEpisode.getByRole('link', {
      name: /pilot season 1 episode 1 episode poster/i,
    });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveTitle("Track'em All");
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // Episode Details
    await expect(page.getByRole('heading', { name: /pilot/i })).toBeVisible();
    await expect(
      page.getByRole('img', {
        name: /pilot still/i,
      })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /s01e01/i })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Air date: 2008-01-20/i })
    ).toBeVisible();
    await expect(
      page.getByText(/When an unassuming high school chemistry/i)
    ).toBeVisible();

    const cast = page.getByTestId('section-cast');
    await expect(cast).toBeVisible();
    const castItems = cast.getByRole('article');
    await expect(castItems.first()).toBeVisible();

    const photos = page.getByTestId('section-photos');
    const photosItems = photos.getByRole('img');
    await expect(photos).toBeVisible();
    await expect(photosItems.first()).toBeVisible();
  });
});
