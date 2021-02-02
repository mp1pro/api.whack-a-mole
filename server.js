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

app.listen(3000, () => console.log("Server is running on localhost:3000"))


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
