/**
 * Client-side favorite payload checks (UX). Server still enforces the same rules.
 * Keep in sync with `functions/utils/favoriteValidation.js`.
 */

const nameMinLength = 1;
const nameMaxLength = 255;

const voteAverageMin = 0;
const voteAverageMax = 10;

const posterPathMinLength = 3;
const posterPathMaxLength = 255;

const SHOW_ID_PATTERN = /^\d+$/;
const showIdMaxLength = 10;

const maxFavorites = 100;

export function showIdValidation(showId) {
  if (showId === null || showId === undefined) {
    return false;
  }

  const normalized = String(showId).trim();

  if (normalized === '' || normalized.length > showIdMaxLength) {
    return false;
  }

  return SHOW_ID_PATTERN.test(normalized);
}

export function nameValidation(name) {
  if (name === null || name === undefined || typeof name !== 'string') {
    return false;
  }

  const normalized = name.trim();
  if (
    normalized === '' ||
    normalized.length > nameMaxLength ||
    normalized.length < nameMinLength
  ) {
    return false;
  }
  return true;
}

export function voteAverageValidation(voteAverage) {
  if (typeof voteAverage !== 'number') {
    return false;
  }
  if (voteAverage < voteAverageMin || voteAverage > voteAverageMax) {
    return false;
  }

  return true;
}

export function posterPathValidation(posterPath) {
  if (typeof posterPath !== 'string') {
    return false;
  }
  if (
    posterPath.length < posterPathMinLength ||
    posterPath.length > posterPathMaxLength
  ) {
    return false;
  }

  return true;
}

export function maxFavoritesValidation(favorites) {
  return favorites.length < maxFavorites;
}

export const FAVORITE_VALIDATION_MESSAGES = {
  favoriteShowIdInvalid: 'The favorite showId is not valid',
  favoriteDataInvalid: 'The favorite data is not valid',
  favoriteNameInvalid: 'The favorite name is not valid',
  favoriteVoteAverageInvalid: 'The favorite vote average is not valid',
  favoritePosterPathInvalid: 'The favorite poster path is not valid',
  maxFavoritesReached: 'You have reached the maximum number of favorites',
};
