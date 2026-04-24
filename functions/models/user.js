const mongoose = require('mongoose');
const { REGISTER_NAME_MAX_LENGTH } = require('../utils/authValidation');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  name: String,
  poster_path: String,
  vote_average: Number,
  showId: String,
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: REGISTER_NAME_MAX_LENGTH,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: REGISTER_NAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    favorites: [
      {
        type: FavoriteSchema,
      },
    ],
  },
  {
    timestamps: true, // set createdAt and updatedAt
  }
);

// Compile model from schema
const User = mongoose.model('User', userSchema);

exports.User = User;
exports.UserSchema = userSchema;
