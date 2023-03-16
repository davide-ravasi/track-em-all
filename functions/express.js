const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
// connect express server to mongodb database
const mongoose = require('mongoose');

const mongoDB = process.env.REACT_APP_MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// end of mongodb connection

// import models
const { User } = require('./models/user');
const { Favorite } = require('./models/favorite');
// end of import models

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router();

// better object with real data from api
// to check if exists in db if not
// retrieve from api endpoint
const getFavorites = ((req, res) => {
  Favorite.find({}, (err, favorites) => {
    if (err) return res.status(500).send(err);
    console.log(favorites);
    res.json(favorites)
  });
});

const registerUser = (async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    // try with reponse text ?
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      favorites: [],
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

const loginUser = (async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(201).json(user);
})

const getUser = (async (req, res) => {
  const user = await User.findById(req.params.id).populate('favorites');
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

router.get('/favorites', getFavorites);
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/:id', getUser);

// add route to login user

app.use('/.netlify/functions/express', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);