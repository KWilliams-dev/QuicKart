const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient } = require('mongodb');
const  items  = require('./itemsListData');




  // type Query {
    //     getItem (id:ID!,name:String!,):Item
    // }

    //getItem(id: ID!):Item

const typeDefs = gql`


    type Query {
      items:[Item!]!
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

   
`;

// type Mutation {
//   createItem(name: String!, aisle: String!): Item!
// }

// type Mutation {
// createItem(name: String!): Item!
// }


console.log(items)
const resolvers = {
Query:  {
 items:() => items,
  },
  // getItem: async(_,{id},{db}) => {
  //   return await db.collection('Item').findOne({_id:ObjectID(id)})}
// },
// Mutation: {
// createItem:async(_, {name},{db}) => {

// const newItem = {name,createdAt: new Date().toISOString()
// }

// const result = await db.collection('Item').insert(newItem);
// return result.ops[0];
// }
// },

Item:{
id: ( { _id, id }) => _id || id,
}

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
