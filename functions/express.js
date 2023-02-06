const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

// connect express server to mongodb database
const mongoose = require('mongoose');

const mongoDB = process.env.REACT_APP_MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// end of mongodb connection

// import models
const { Favorite } = require('./models/favorite');
// end of import models

const router = express.Router();

const getFavorites = ((req, res) => {
  Favorite.find({}, (err, favorites) => {
    if (err) return res.status(500).send(err);
    console.log(favorites);
    res.json(favorites)
  });
});

router.get('/favorites', getFavorites);
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/express', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);