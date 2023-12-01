const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongoDB = process.env.REACT_APP_MONGODB_URI;
const jwtSecret = process.env.REACT_APP_JWT_SECRET;

const { User } = require("../models/user");

const generateAccessToken = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: "30d" });
};

const saltRounds = 10;

// @desc get user informations
// @route GET /user/:id
// @access Authenticated
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("favorites");
  if (user) {
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      favorites: user.favorites,
    });
  } else {
    res.status(404).send("User not found");
    throw new Error("User not found");
  }
});

// @desc Authenticate a user
// @route POST /user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = JSON.parse(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).send("User not found");
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).send("Invalid password");
    throw new Error("Invalid password");
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
  const { firstName, lastName, email, password } = JSON.parse(req.body);
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("Please fill all the fields");
    throw new Error("Please fill all the fields");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    // try with reponse text ?
    res.status(400).send("User already exists");
    throw new Error("User already exists");
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
    res.status(400);
    throw new Error(err);
  }
});

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
