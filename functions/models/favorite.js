const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  showId: {
    type: String,
    required: [true, 'Show ID is required'],
    trim: true,
  },
  name: {
    type: String,
    maxlength: [255, 'Name must be less than 255 characters'],
    minlength: [1, 'Name must be at least 1 character'],
    required: [true, 'Name is required'],
    trim: true,
  },
  poster_path: {
    type: String,
    maxlength: [255, 'Poster path must be less than 255 characters'],
    minlength: [3, 'Poster path must be at least 3 characters'],
    trim: true,
  },
  vote_average: {
    type: Number,
    min: [0, 'Vote average must be greater than 0'],
    max: [10, 'Vote average must be less than 10'],
  },
});

exports.FavoriteSchema = FavoriteSchema;
