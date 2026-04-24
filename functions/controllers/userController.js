const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Same as express.js: serverless uses process.env, not import.meta.env (Vite).
const jwtSecret = process.env.VITE_JWT_SECRET;
const {
  isValidEmailFormat,
  isValidRegisterPassword,
  isRegisterNameLengthValid,
  isRegisterNameCharactersValid,
  AUTH_FORM_MESSAGES,
} = require('../utils/authValidation');

const { User } = require('../models/user');

const generateAccessToken = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: '1h' });
};

const saltRounds = 10;

// @desc get user informations
// @route GET /user
// @access Authenticated
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(String(req.user?.id)).populate('favorites');
  if (user) {
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      favorites: user.favorites,
    });
  } else {
    res.status(404).json({ message: AUTH_FORM_MESSAGES.userNotFound });
  }
});

// @desc Authenticate a user
// @route POST /user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};

  const trimmedEmail = String(email ?? '')
    .trim()
    .toLowerCase();
  const trimmedPassword = String(password ?? '').trim();

  if (!trimmedEmail) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.emailRequired });
    return;
  }

  if (!trimmedPassword) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.loginPasswordRequired });
    return;
  }

  if (!isValidEmailFormat(trimmedEmail)) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.emailInvalidFormat });
    return;
  }

  const user = await User.findOne({ email: trimmedEmail }).select('+password');

  if (!user) {
    res.status(401).json({ message: AUTH_FORM_MESSAGES.emailPasswordInvalid });
    return;
  }

  const validPassword = await bcrypt.compare(trimmedPassword, user.password);

  if (!validPassword) {
    res.status(401).json({ message: AUTH_FORM_MESSAGES.emailPasswordInvalid });
    return;
  }

  res.status(201).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    favorites: user.favorites,
    token: generateAccessToken({ id: user._id }),
  });
});

// @desc Register new user
// @route POST /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body ?? {};
  const trimmedFirstName = String(firstName ?? '').trim();
  const trimmedLastName = String(lastName ?? '').trim();
  const trimmedEmail = String(email ?? '')
    .trim()
    .toLowerCase();
  const trimmedPassword = String(password ?? '').trim();

  if (!trimmedFirstName) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.firstNameRequired });
    return;
  }

  if (!trimmedLastName) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.lastNameRequired });
    return;
  }

  if (!trimmedEmail || !trimmedPassword) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.pleaseFillAllFields });
    return;
  }

  if (
    !isRegisterNameLengthValid(trimmedFirstName) ||
    !isRegisterNameLengthValid(trimmedLastName)
  ) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.registerNameTooLong });
    return;
  }

  if (
    !isRegisterNameCharactersValid(trimmedFirstName) ||
    !isRegisterNameCharactersValid(trimmedLastName)
  ) {
    res
      .status(400)
      .json({ message: AUTH_FORM_MESSAGES.registerNameInvalidCharacters });
    return;
  }

  if (!isValidEmailFormat(trimmedEmail)) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.emailInvalidFormat });
    return;
  }

  if (!isValidRegisterPassword(trimmedPassword)) {
    res
      .status(400)
      .json({ message: AUTH_FORM_MESSAGES.registerPasswordPolicy });
    return;
  }

  const existingUser = await User.findOne({ email: trimmedEmail });

  if (existingUser) {
    res.status(400).json({ message: AUTH_FORM_MESSAGES.userAlreadyExists });
    return;
  }

  const hashedPassword = await bcrypt.hash(trimmedPassword, saltRounds);

  const user = new User({
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: trimmedEmail,
    password: hashedPassword,
    favorites: [],
  });

  const savedUser = await user.save();
  res.status(201).json({
    id: savedUser._id,
  });
});

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
