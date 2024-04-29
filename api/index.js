const typeDefs = require ('../graphql/typeDefs');
const resolvers = require ('../graphql/resolvers');
const { ApolloServer } = require('apollo-server');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const MONGODB=process.env.CONNECTION_STRING;

const server =  new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {})
.then( () => {
    console.log("MongoDB connection successful");
    return server.listen({port:5000});
})
.then( (res) => {
    console.log(`Server  running at ${res.url}`);
});