
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient } = require('mongodb');

const typeDefs = gql`
    type Query {
        getItem (
          id:ID!,
          name:String!,
        ):Item
    }
    
    type Item{
      id:ID!,
      name:String!,
      aisle:String!,
      bay:String!,
      price:Float!,
      xVal:Int!,
      yVal:Int!
    }

    type Mutation {
        createItem(name: String!, aisle: String!): Item!
    }

`;



const resolvers = {
  Query:  {

  },
  Mutation: {

  },
};

const start = async () => {
  const client = new MongoClient("mongodb+srv://admin:admin@quickkartcluster.o0bsfej.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db("QuickKart");
 
  const context = {
    db,
  }
  
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
      introspection: true
  }); 
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url + 'quickkart'}`);
  });
}

start();
