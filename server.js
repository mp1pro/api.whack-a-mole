const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  {graphqlHTTP}  = require("express-graphql");

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

//const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uox7n.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const uri = "mongodb+srv://mp1pro:CL123456@cluster0.wk1ih.mongodb.net/game-points?retryWrites=true&w=majority";

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, options)
  .then(() => app.listen(3000, console.log("Server is running")))
  .catch(error => {
    throw error
  })


/*

app.listen(5000, async () => {
  console.log("server is running ", 5000);
  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);
*/
