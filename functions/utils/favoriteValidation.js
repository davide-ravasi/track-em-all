// check if the showId is valid

const nameMinLength = 1;
const nameMaxLength = 255;

const voteAverageMin = 0;
const voteAverageMax = 10;

const posterPathMinLength = 3;
const posterPathMaxLength = 255;

const SHOW_ID_PATTERN = /^\d+$/;
const showIdMaxLength = 10;

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
  if (
    name === null ||
    name === undefined ||
    typeof name !== 'string' ||
    name.trim() === ''
  ) {
    return false;
  }
  if (
    name.trim().length < nameMinLength ||
    name.trim().length > nameMaxLength
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

const FAVORITE_VALIDATION_MESSAGES = {
  favoriteShowIdInvalid: 'The favorite showId is not valid',
  favoriteDataInvalid: 'The favorite data is not valid',
  favoriteNameInvalid: 'The favorite name is not valid',
  favoriteVoteAverageInvalid: 'The favorite vote average is not valid',
  favoritePosterPathInvalid: 'The favorite poster path is not valid',
};

module.exports = {
  FAVORITE_VALIDATION_MESSAGES,
  nameValidation,
  voteAverageValidation,
  posterPathValidation,
  showIdValidation,
};
