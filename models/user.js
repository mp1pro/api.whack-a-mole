const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: String,
    points: Number
    
  },
  { timestamps: true}
);

module.exports = {
  UserSchema: mongoose.model("users", User)
};
