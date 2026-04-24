const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { AUTH_FORM_MESSAGES } = require('./utils/authValidation');

// connect express server to mongodb database
const mongoose = require('mongoose');

// Netlify Functions run on Node, not Vite — use process.env (import.meta.env is undefined here).
const mongoDB = process.env.VITE_MONGODB_URI;
const jwtSecret = process.env.VITE_JWT_SECRET;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const {
  getUser,
  loginUser,
  registerUser,
} = require('./controllers/userController');
const {
  addFavorite,
  removeFavorite,
} = require('./controllers/favoriteController');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.accessTokenNotFound });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.accessTokenNotFound });
  }

  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: AUTH_FORM_MESSAGES.invalidToken });
    }
    req.user = decoded; // Attach user to request
    next();
  });
};

router.post('/favorite/remove', protect, removeFavorite);
router.post('/favorite/add', protect, addFavorite);
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user', protect, getUser);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/.netlify/functions/express', router);
app.use(router);

// SPA fallback only for GET / (avoid swallowing POST /user/register, etc.)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
}); // Express only treats arity-4 functions as error middleware (see express/lib/router/layer.js).

app.use((err, req, res, _next) => {
  console.error(err);
  const status = Number(err.status) || Number(err.statusCode) || 500;
  const message =
    process.env.NODE_ENV === 'production' && status >= 500
      ? 'Internal server error'
      : err.message || 'An error occurred';
  res.status(status).json({ message });
});

module.exports = app;
module.exports.handler = serverless(app);
