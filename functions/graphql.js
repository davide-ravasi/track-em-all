const { ApolloServer, gql } = require("apollo-server-lambda");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

let db;

const server = new ApolloServer({
  typeDefs,
  csrfPrevention: true, // see below for more about this
  context: async () => {
    if (!db) {
      try {
        const dbClient = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
        });
      } catch (e) {
        console.log("--->error while connecting with graphql context (db)", e);
      }
    }
  },
  cors: {
    origin: ["http://localhost:3000"],
  },
  mocks: true,
  introspection: true,
  playground: true, // enable GraphQL Playground IDE on prod env
});

exports.handler = server.createHandler(); // Don't forget to add this!
