const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.port || 5000;
// A map of functions which return data for the schema.

const server = new ApolloServer({
	typeDefs,
	resolvers,
});
mongoose.connect(MONGODB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});
mongoose.connection.once("open", () => {
	console.log("conneted to database");
});
server.listen({ port: PORT }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
