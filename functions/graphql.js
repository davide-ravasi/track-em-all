const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  csrfPrevention: true, // see below for more about this
  cors: {
    origin: ["http://localhost:3000"],
  },
  mocks: true,
  playground: true, // enable GraphQL Playground IDE on prod env
});

exports.handler = server.createHandler(); // Don't forget to add this!
