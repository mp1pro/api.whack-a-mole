const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  {graphqlHTTP}  = require("express-graphql");
require('dotenv').config();

const graphqlSchema = require("./schemas");
const graphqlResolvers = require("./resolvers");

const decodeIDToken = require("./auth/authMid");

// Add CORS headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(decodeIDToken);

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
