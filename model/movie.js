const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      enum: ["drama", "action", "romance", "comedy"],
      default: ["drama"],
    },
    // Valid years start from 1900
    year: {
      type: Number,
      required: true,
    },
    // Valid score is from 0 - 10
    score: {
      type: Number,
      required: true,
    },
  },
  {
    //Changes the default mongo display of "_id" to just "id"
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Movie", movieSchema);
