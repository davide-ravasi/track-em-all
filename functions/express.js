const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// connect express server to mongodb database
const mongoose = require("mongoose");

const mongoDB = process.env.REACT_APP_MONGODB_URI;
const jwtSecret = process.env.REACT_APP_JWT_SECRET;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// end of mongodb connection

// import models
const { Favorite } = require("./models/favorite");
// end of import models

const { getUser, loginUser, registerUser } = require("./controllers/userController");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader && authHeader.startsWith("Bearer ")) {
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

    req.user = decoded;
  });

  next();
};
// better object with real data from api
// to check if exists in db if not
// retrieve from api endpoint
const getFavorites = (req, res) => {
  Favorite.find({}, (err, favorites) => {
    if (err) return res.status(500).send(err);
    console.log(favorites);
    res.json(favorites);
  });
};

router.get("/favorites", getFavorites);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/:id", protect, getUser);

// add route to login user

app.use("/.netlify/functions/express", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
