const mongoose = require("mongoose");
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
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
const User = mongoose.model("User", userSchema);

exports.User = User;
exports.UserSchema = userSchema;
