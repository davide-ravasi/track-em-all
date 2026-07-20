const nameMinLength = 1;
const nameMaxLength = 255;

const voteAverageMin = 0;
const voteAverageMax = 10;

const posterPathMinLength = 3;
const posterPathMaxLength = 255;

const SHOW_ID_PATTERN = /^\d+$/;
const showIdMaxLength = 10;

const maxFavorites = 100;

const showIdValidation = (showId) => {
  if (showId === null || showId === undefined) {
    return false;
  }

  const normalized = String(showId).trim();

  if (normalized === '' || normalized.length > showIdMaxLength) {
    return false;
  }

  return SHOW_ID_PATTERN.test(normalized);
};

const nameValidation = (name) => {
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
};

const voteAverageValidation = (voteAverage) => {
  if (typeof voteAverage !== 'number') {
    return false;
  }
  if (voteAverage < voteAverageMin || voteAverage > voteAverageMax) {
    return false;
  }

  return true;
};

const posterPathValidation = (posterPath) => {
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
};

const existingFavoriteValidation = (favorites, showId) => {
  return favorites.some(
    (favorite) => favorite.showId === String(showId).trim()
  );
};

const maxFavoritesValidation = (favorites) => {
  return favorites.length < maxFavorites;
};

const FAVORITE_VALIDATION_MESSAGES = {
  favoriteShowIdInvalid: 'The favorite showId is not valid',
  favoriteDataInvalid: 'The favorite data is not valid',
  favoriteNameInvalid: 'The favorite name is not valid',
  favoriteVoteAverageInvalid: 'The favorite vote average is not valid',
  favoritePosterPathInvalid: 'The favorite poster path is not valid',
  favoriteAlreadyExists: 'The show is already in your favorites',
  maxFavoritesReached: 'You have reached the maximum number of favorites',
};

module.exports = {
  FAVORITE_VALIDATION_MESSAGES,
  nameValidation,
  voteAverageValidation,
  posterPathValidation,
  showIdValidation,
  existingFavoriteValidation,
  maxFavoritesValidation,
};
