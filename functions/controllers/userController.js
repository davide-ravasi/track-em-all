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
const getUser = async (req, res) => {
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
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Authenticate a user
// @route POST /user/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.status(201).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    favorites: user.favorites,
    token: generateAccessToken({ id: user._id }),
  });
};

// better object with real data from api
// to check if exists in db if not
// retrieve from api endpoint

// @desc Register new user
// @route POST /user/register
// @access Public
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existingUser = await User.findOne({ email: email });

  // validate if one of the field is not present

  if (existingUser) {
    // try with reponse text ?
    return res.status(400).json({ message: "User already exists" });
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
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      favorites: savedUser.favorites,
      token: generateAccessToken({ id: savedUser._id }),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// route error handling
// express-async-handler


module.exports = {
  getUser,
  loginUser,
  registerUser,
};
