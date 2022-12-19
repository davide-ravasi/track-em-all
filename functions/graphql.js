const { ApolloServer, gql } = require("apollo-server-lambda");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const uri = process.env.REACT_APP_MONGODB_URI;
const main = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

main()
  .then(console.log("🎉 connected to database successfully"))
  .catch((error) => console.error(error));

const server = new ApolloServer({
  typeDefs,
  csrfPrevention: true, // see below for more about this
  cors: {
    origin: "*",
  },
  mocks: true,
  introspection: true,
  playground: true, // enable GraphQL Playground IDE on prod env
});

exports.handler = server.createHandler(); // Don't forget to add this!
