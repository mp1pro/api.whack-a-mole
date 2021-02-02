const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  {graphqlHTTP}  = require("express-graphql");
require('dotenv').config();

const graphqlSchema = require("./schemas");
const graphqlResolvers = require("./resolvers");


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wk1ih.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false);

mongoose.connect(uri, options)
  .then(() => app.listen(3000, console.log("Server is running",process.env.MONGO_USER)))
  .catch(error => {
    throw error
  })
