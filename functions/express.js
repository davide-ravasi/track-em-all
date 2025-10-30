const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// connect express server to mongodb database
const mongoose = require("mongoose");

const mongoDB = import.meta.env.VITE__APP_MONGODB_URI;
const jwtSecret = import.meta.env.VITE__APP_JWT_SECRET;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// end of mongodb connection

// import models
//const { Favorite } = require("./models/favorite");
// end of import models

const {
  getUser,
  loginUser,
  registerUser,
} = require("./controllers/userController");
const { User } = require("./models/user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token not found" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }

  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach user to request
    next();
  });
};
// better object with real data from api
// to check if exists in db if not
// retrieve from api endpoint
// const getFavorites = (req, res) => {
//   Favorite.find({}, (err, favorites) => {
//     if (err) return res.status(500).send(err);
//     console.log(favorites);
//     res.json(favorites);
//   });
// };

const addFavorite = async (req, res) => {
  const { name, poster_path, vote_average, userId, showId } = JSON.parse(
    req.body
  );
  console.log("userId: ", userId);
  const user = await User.findById(userId);

  console.log("user: ", user);
  if (!user) {
    res.status(400).send("User not found");
  }

  const favorite = {
    showId,
    name,
    poster_path,
    vote_average,
  };

  user.favorites.push(favorite);

  const updatedUser = await user.save();

  res.status(201).json({
    id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    favorites: updatedUser.favorites,
  });
};

const removeFavorite = async (req, res) => {
  const { userId, showId } = JSON.parse(req.body);

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).send("User not found");
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
};

router.post("/favorite/remove", protect, removeFavorite);
router.post("/favorite/add", protect, addFavorite);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/:id", protect, getUser);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/.netlify/functions/express", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
