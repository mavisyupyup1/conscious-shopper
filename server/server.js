const express = require('express');
//import ApolloServer
const {ApolloServer,gql}=require('apollo-server-express')

//import our typeDefs and resolvers
const {typeDefs, resolvers} =require('./schemas')
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path= require('path')
const PORT = process.env.PORT || 3001;
const app = express();
const { GraphQLUpload,graphqlUploadExpress } = require("graphql-upload");

const startServer =async()=>{
  //create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // Start the Apollo server
  await server.start();

  //integrate our Apollo server with the express application as middleware
  server.applyMiddleware({app});

  //log where we can go to test out GQL API
  console.log(`Use graphQL at http://localhost:${PORT}${server.graphqlPath}`)
};

//initialize the Apollo Server
startServer();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
// Serve up static assets
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../client/build')))
}
app.use(express.static(path.join(__dirname,'/public/images')))

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
