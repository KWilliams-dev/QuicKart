
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');
const { assertValidSDLExtension } = require('graphql/validation/validate');

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
    
    type StoreMap {
      id: ID!,
      description: String,
      aisle: [Aisle!]!,
      width: Int!,
      length: Int!,
      entrance: [[Int!]!]! 
    }
    
    input MapInput {
      description: String, 
      aisle: [Aisle!]!, 
      width: Int!, 
      length: Int!
    }

    type User {
      id: ID!,
      shoppingList: [Item!]!,
      startingLocation: [[Int!]!]! 
    }

    type Mutation {
        createItem(name: String!, aisle: String!): Item!
        
        createMap(input: MapInput!): StoreMap!
        getMap(id: ID!): StoreMap!

        #demonstration purposes only!!!
        #TODO: delete after 9-26
        getAllMapCoords(id: ID!): [[Int]!]!
    }

`;

const resolvers = {
  Query:  {

  },
  Mutation: {
    createMap: async (_, { description, width, length }, { db, aisle }) => {
        if(!aisle) { throw new Error('Aisle does not exist') }

        const newMap = {
          description, 
          aisle: [aisle],
          width,
          length
        }
        
        const result = await db.collection('Map').insert(newMap);

        return result.ops[0]
    },

    getMap: async (_, { id }, { db }) => {
      return await db.collection('Map').findOne({ _id: ObjectID(id) });
    },

    getAllMapCoords: async (_, { id }, { db}) => {
        if(!await db.collection('Map').findOne({ _id: ObjectID(id) })) {
            throw new Error('Map not found');
        }
        const data = [[]];
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < length; y++) {
                data.push([x,y]);
            }        
        }
        return data;
    },

  },
  StoreMap: {
    id: ({ _id, id }) => id || id,
  },
};

const start = async () => {
  const client = new MongoClient("mongodb+srv://admin:admin@quickkartcluster.o0bsfej.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db("QuickKart");
 
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: db,
      introspection: true
  }); 
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url + 'quickkart'}`);
  });
}

start();