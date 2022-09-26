const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient,ObjectID } = require('mongodb');





  // type Query {
    //     getItem (id:ID!,name:String!,):Item
    // }

    //getItem(id: ID!):Item

const typeDefs = gql`


    type Query {
      getItem (
        id:ID!,
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

    #created to create the items in apollographql
    type Mutation {
      createItem(name: String!,aisle:String!,bay:String!,price:Float!,xVal:Int!,yVal:Int!): Item!
      }
   
`;

// type Mutation {
//   createItem(name: String!, aisle: String!): Item!
// }





const resolvers = {
Query:  {
  getItem: async(_, { id }, { db }) => {
    return await db.collection('Item').findOne({ _id: ObjectID(id) });
  },
  },
  // getItem: async(_,{id},{db}) => {
  //   return await db.collection('Item').findOne({_id:ObjectID(id)})}
// },

Mutation: {
createItem:async(_, {name, aisle, bay, price, xVal, yVal},{db}) => {

const newItem = {name, aisle, bay, price, xVal, yVal, createdAt: new Date().toISOString()
}

const result = await db.collection('Item').insert(newItem);
return result.ops[0];
}
},

Item:{
id: ( { _id, id }) => _id || id,
}

};


const start = async () => {
  const client = new MongoClient("mongodb+srv://admin:admin@quickkartcluster.o0bsfej.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db("quickKart");
 
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