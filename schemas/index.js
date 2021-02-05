 

const { buildSchema } = require('graphql')


module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    points: Int!
    createdAt: String!
  }
  
  
  input UserInput {
    email: String!
    points: Int!
  }
  
  type Query {
    users:[User!]
    getUser( email: String!): User
  }
  type Mutation {
    createUser(user:UserInput): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`)
