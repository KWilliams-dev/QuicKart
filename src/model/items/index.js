const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const Db = require('mongodb/lib/db');
dotenv.config();
const { DB_URI, DB_NAME} = process.env;

const typeDefs = gql`
    type Query {
      getItem (
        id:ID!,
        name:String!,
      ):Item

      getAisle (id:ID!): Aisle

      getBay (id:ID!): Bay
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

    type Aisle{
      id: ID!,
      name:String!,
      bays:[Bay!]!,
      location: Location!
    }

    type Bay{
      id: ID!,
      name:String!,
      items:[Item!]!,
      location: Location!
    }

    type Location{
      xStartVal:Int!,
      xEndVal:Int!,
      yStartVal:Int!,
      yEndVal:Int!
    }

    type Mutation {
      createItem(name: String!, aisle: String!): Item!
      createAisle(name: String!): Aisle!
      createBay(name: String!): Aisle!
    }
`;


const resolvers = {
  Query:  {
    
    getAisle: async(_, { id }, { db }) => {
      return await db.collection('Aisles').findOne({ _id: ObjectID(id) });
    },
    
    getBay: async(_, { id }, { db }) => {
      return await db.collection('Bays').findOne({ _id: ObjectID(id) });
    }

  },
  Mutation: {
    createAisle: async(_, { name }, { db }) => {
      //  name:String!, bays:[Bay!]!, xStartVal:Int!, xEndVal:Int!, yStartVal:Int!, yEndVal:Int!
      const newAisle = {
          name
      }

      // insert newAisle object into database
      const result = await db.collection('Aisles').insert(newAisle);
      return result.ops[0]; // first item in array is the item we just added
  },

  createBay: async(_, { name }, { db }) => {
    //  name:String!, bays:[Bay!]!, xStartVal:Int!, xEndVal:Int!, yStartVal:Int!, yEndVal:Int!
    const newBay = {
        name
    }

    // insert newAisle object into database
    const result = await db.collection('Bays').insert(newBay);
    return result.ops[0]; // first item in array is the item we just added
  },

  },

  // did this so then Aisle.id in Apollo wouldn't give an error for non-nullable fields
  Aisle: {
    id: ({ _id, id }) => _id || id,  
  },

  Bay: {
    id: ({ _id, id }) => _id || id,  
  },
  
};

const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME); // defines the database

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