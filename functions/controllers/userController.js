const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Same as express.js: serverless uses process.env, not import.meta.env (Vite).
const jwtSecret = process.env.VITE_JWT_SECRET;

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
    res.status(404).send('User not found');
  }
});

// @desc Authenticate a user
// @route POST /user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(400).send('User not found');
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).send('Invalid password');
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

// better object with real data from api
// to check if exists in db if not
// retrieve from api endpoint

// @desc Register new user
// @route POST /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send('Please fill all the fields');
    return;
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    // try with reponse text ?
    res.status(400).send('User already exists');
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      favorites: [],
    });

    const savedUser = await user.save();
    res.status(201).json({
      id: savedUser._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Registration failed');
    return;
  }
});

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
