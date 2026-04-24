const { AUTH_FORM_MESSAGES } = require('../utils/authValidation');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');

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

  if (String(showId).trim() === '' || !name) {
    return res
      .status(400)
      .json({ message: AUTH_FORM_MESSAGES.favoriteDataInvalid });
  }

  const favorite = {
    showId,
    name,
    poster_path,
    vote_average,
  };

  user.favorites.push(favorite);

  const updatedUser = await user.save();

  // TO DO:  the data can be removed from the response if not needed?
  // TO DO: and for security reasons?
  res.status(201).json({
    id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
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

  if (!showId) {
    return res
      .status(400)
      .json({ message: AUTH_FORM_MESSAGES.favoriteDataInvalid });
  }

  user.favorites = user.favorites.filter(
    (favorite) => favorite.showId !== showId.toString()
  );

  const updatedUser = await user.save();

  res.status(201).json({
    id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    favorites: updatedUser.favorites,
  });
});

module.exports = {
  addFavorite,
  removeFavorite,
};
