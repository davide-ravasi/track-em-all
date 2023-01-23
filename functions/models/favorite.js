const mongoose = require("mongoose");
// Define schema
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  name: String,
  poster_path: String,
  user: Schema.Types.ObjectId,
  vote_average: Number,
});

// Compile model from schema
const Favorite = mongoose.model("Favorite", FavoriteSchema);

exports.Favorite = Favorite;
exports.FavoriteSchema = FavoriteSchema;
