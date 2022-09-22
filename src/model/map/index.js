const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const Db = require('mongodb/lib/db');
const { assertValidSDLExtension } = require('graphql/validation/validate');

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

      getMap(id: ID!): StoreMap

      # demonstration purposes only!!!
      # TODO: delete after 9-26-22
      getAllMapCoords(id: ID!): [[Int]]
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

    type StoreMap {
      id: ID!,
      description: String!,
      aisle: [Aisle],
      width: Int!,
      length: Int!
    }
    
    type Mutation {
      createItem(name: String!, aisle: String!): Item!
      createAisle(name: String!): Aisle!
      createBay(name: String!): Aisle!

      createMap(description: String!, width: Int!, length: Int!): StoreMap!
    }
`;


const resolvers = {
  Query:  {
    
    getAisle: async(_, { id }, { db }) => {
      return await db.collection('Aisles').findOne({ _id: ObjectID(id) });
    },
    
    getBay: async(_, { id }, { db }) => {
      return await db.collection('Bays').findOne({ _id: ObjectID(id) });
    },

    getMap: async (_, { id }, { db }) => {
      return await db.collection('Map').findOne({ _id: ObjectID(id) });
    },  
    
    getAllMapCoords: async (_, { id }, { db}) => {
      const map = await db.collection('Map').findOne({ _id: ObjectID(id) });
      if(!map) {
          throw new Error('Map not found');
      }
      
      const coordinates = [];
      for(let x = 0; x <= map.width; x++) {
          for(let y = 0; y <= map.length; y++) {
            coordinates.push([x,y]);
          }        
      }
      return coordinates;
      
    },

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
  createMap: async (_, { description, width, length }, { db }) => { 

    const aisles = await db.collection('Aisles').find().toArray();

    // TODO: Check if the aisle and bay coordinates exist within the map area

    const newMap = {
      description,
      width,
      length,
      aisle: aisles
    }
    
    const result = await db.collection('Map').insert(newMap);

    return result.ops[0]
  },

  },

  // did this so then Aisle.id in Apollo wouldn't give an error for non-nullable fields
  Aisle: {
    id: ({ _id, id }) => _id || id,  
  },

  Bay: {
    id: ({ _id, id }) => _id || id,  
  },
  
  StoreMap: {
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