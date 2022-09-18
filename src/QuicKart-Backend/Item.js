
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');

// Model the data for a item here in MongoDB.
// Look into using realm (MongoDB tech) https://www.mongodb.com/docs/realm/sdk/react-native/
// Write code to write Item objects to database


// const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


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
      // myTaskLists: async (_, __, { db, user }) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     return await db.collection('TaskList')
      //                     .find({ userIds: user._id })
      //                     .toArray();
      

      // },

      // createGroceryList: async(_, { id, title }, { db, user}) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     return await db.collection('TaskList').findOne({ _id: ObjectID(id) });
      // },

  },
  Mutation: {
      //CREATE GROCERY LIST 


      // signUp: async (_, { input }, { db }) => {
      //     const hashedPassword = bcrypt.hashSync(input.password);
      //     const newUser = {
      //         ...input,
      //         password: hashedPassword,
      //     }
      //     //save to database
          
      //     const result = await db.collection('Users').insert(newUser);
      //     const user = result.ops[0];

      //     return {
      //         user, 
      //         token: getToken(user),
      //     }
      // },

      // signIn: async (_, { input }, { db }) => {
      //     const user = await db.collection('Users').findOne({ email: input.email });
      //     if(!user) {
      //         throw new Error('Invalid credentials');
      //     }

      //     const isPasswordCorrect = bcrypt.compareSync(input.password, user.password);
      //     if(!isPasswordCorrect) {
      //         throw new Error('Invalid credentials');
      //     }

      //     return {
      //         user,
      //         token: getToken(user),
      //     }
      // },
  
      // createTaskList: async(_, { title }, { db, user }) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     const newTaskList = {
      //         title,
      //         createdAt: new Date().toISOString(),
      //         userIds: [user._id]
      //     }
      //     const result = await db.collection('TaskList').insert(newTaskList);
          
      //     return result.ops[0]
      // },

      // updateTaskList: async(_, { id, title }, { db, user}) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     const result = await db.collection('TaskList')
      //                             .updateOne({
      //                                 _id: ObjectID(id)
      //                             }, {
      //                                 $set: {
      //                                     title
      //                                 }
      //                             })

          
      //     return await db.collection('TaskList').findOne({ _id: ObjectID(id) });
      // },

      // addUserToTaskList: async(_, { taskListId, userId }, { db, user }) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     const taskList = await db.collection('TaskList').findOne({ _id: ObjectID(taskListId) });
      //     if(!taskList) {
      //         return null;
      //     }
      //     if(taskList.userIds.find((dbId) => dbId.toString() === userId.toString())) {
      //         return taskList;
      //     }
      //     await db.collection('TaskList')
      //             .updateOne({
      //                 _id: ObjectID(id)
      //             }, {
      //                 $push: {
      //                     userIds: ObjectID(userId),
      //                 }
      //             })
      //     taskList.userIds.push(ObjectID(userId))
      //     return taskList;
      // },

      // deleteTaskList: async(_, { id, title }, { db, user}) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     /// TODO only collaborators of this task list should be able to delete
      //     await db.collection('TaskList').removeOne({ _id: ObjectID(id) });

      //     return true;
      // },

      // //Todo items
      // createToDo: async(_, { content, taskListId }, { db, user}) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }
      //     const newToDo = {
      //         content,
      //         taskListId: ObjectID(taskListId),
      //         isCompleted: false,
      //     }
      //     const result = await db.collection('Todo').insert(newToDo);
      //     return result.ops[0];
      // },

      // updateToDo: async(_, data , { db, user }) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     const result = await db.collection('Todo')
      //                             .updateOne({
      //                                 _id: ObjectID(data.id)
      //                             }, {
      //                                 $set: data
      //                             })

          
      //     return await db.collection('Todo').findOne({ _id: ObjectID(data.id) });
      // },
      
      // deleteToDo: async(_, { id, title }, { db, user}) => {
      //     if (!user) { throw new Error('Authentication Error. Please sign in'); }

      //     /// TODO only collaborators of this task list should be able to delete
      //     await db.collection('Todo').removeOne({ _id: ObjectID(id) });

      //     return true;
      // },

  },
};

const start = async () => {
  const client = new MongoClient("mongodb+srv://admin:admin@quickkartcluster.o0bsfej.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db("QuickKart");
 
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
          const user = await getUserFromToken(req.headers.authorization, db);
          return {
              db,
              user,
          }
      },
  }); 
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
  });
}

start();