const { AUTH_FORM_MESSAGES } = require('../utils/authValidation');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');
const {
  FAVORITE_VALIDATION_MESSAGES,
  nameValidation,
  voteAverageValidation,
  posterPathValidation,
  showIdValidation,
} = require('../utils/favoriteValidation');

const addFavorite = asyncHandler(async (req, res) => {
  // Set in `protect` after jwt.verify — same payload as login: { id: user._id, iat, exp }
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.invalidTokenPayload });
  }

  const { name, poster_path, vote_average, showId } = req.body;
  const user = await User.findById(String(userId));

  if (!user) {
    return res.status(400).json({ message: AUTH_FORM_MESSAGES.userNotFound });
  }

  if (!showIdValidation(showId)) {
    return res
      .status(400)
      .json({ message: FAVORITE_VALIDATION_MESSAGES.favoriteShowIdInvalid });
  }

  if (!nameValidation(name)) {
    return res
      .status(400)
      .json({ message: FAVORITE_VALIDATION_MESSAGES.favoriteNameInvalid });
  }

  if (vote_average && !voteAverageValidation(vote_average)) {
    return res.status(400).json({
      message: FAVORITE_VALIDATION_MESSAGES.favoriteVoteAverageInvalid,
    });
  }

  if (poster_path && !posterPathValidation(poster_path)) {
    return res.status(400).json({
      message: FAVORITE_VALIDATION_MESSAGES.favoritePosterPathInvalid,
    });
  }

  const favorite = {
    showId: String(showId).trim(),
    name: String(name).trim(),
    poster_path: poster_path ? String(poster_path).trim() : poster_path,
    vote_average: vote_average,
  };

  user.favorites.push(favorite);

  const updatedUser = await user.save();

  res.status(201).json({
    favorites: updatedUser.favorites,
  });
});

const removeFavorite = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.invalidTokenPayload });
  }

  const { showId } = req.body;
  const user = await User.findById(String(userId));

  if (!user) {
    return res.status(400).json({ message: AUTH_FORM_MESSAGES.userNotFound });
  }

  if (!showIdValidation(showId)) {
    return res
      .status(400)
      .json({ message: FAVORITE_VALIDATION_MESSAGES.favoriteDataInvalid });
  }

  user.favorites = user.favorites.filter(
    (favorite) => favorite.showId !== showId.toString()
  );

  const updatedUser = await user.save();

  res.status(201).json({
    favorites: updatedUser.favorites,
  });
});

module.exports = {
  addFavorite,
  removeFavorite,
};
