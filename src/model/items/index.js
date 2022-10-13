//connects the database to the server
const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');

const dotenv = require('dotenv');
const Db = require('mongodb/lib/db');
const { assertValidSDLExtension } = require('graphql/validation/validate');

dotenv.config();
const { DB_URI, DB_NAME} = process.env;

//defining the different types in the schema
const typeDefs = gql`


    type Query {
      #creating an arrays of items
      items:[Item!]!

      #gets a specific item by its ID
      getItem (id:ID!):Item

      getInventory (id: Int!): [Item]!

      getAisle (id:ID!): Aisle

      getMap(id: ID!): StoreMap

      getAllMapCoords(id: ID!): [[Int]]
    }
    
    #defining what a item is in our database
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
      number: Int!,
      name:String!,
      bays:[[Int]!]!,
      xStartVal:Int!,
      xEndVal:Int!,
      yStartVal:Int!,
      yEndVal:Int!
    }

    type StoreMap {
      id: ID!,
      title: String!
      description: String,
      aisle: [Aisle!]!,
      checkout: [Checkout!]!
      width: Int!,
      length: Int!
      entrance: [Door!]!
    }

    type Checkout {
      lane: Int!,
      xStartVal:Int!,
      xEndVal:Int!,
      yStartVal:Int!,
      yEndVal:Int!
    }

    type Door {
      name: String!,
      xStartVal:Int!,
      xEndVal:Int!,
      yStartVal:Int!,
      yEndVal:Int!
    }
    
    type Inventory {
      id: Int!
      title: String!
      items: [Item]!
    }
    
    type Mutation {
      createInventory(id: Int!, title: String!): Inventory!

      #creates an item
      createItem(name: String!,aisle:String!,bay:String!,price:Float!,xVal:Int!,yVal:Int!): Item!

      createAisle(
        number: Int!
        name: String!, 
        xStartVal: Int!, 
        xEndVal: Int!, 
        yStartVal: Int!,
        yEndVal: Int!
      ): Aisle!

      createCheckout(
        lane: Int!,
        xStartVal:Int!,
        xEndVal:Int!,
        yStartVal:Int!,
        yEndVal:Int!
      ): Checkout!

      createDoor(
        name: String!,
        xStartVal:Int!,
        xEndVal:Int!,
        yStartVal:Int!,
        yEndVal:Int!
      ): Door!

      createMap(title: String!, description: String!, width: Int!, length: Int!): StoreMap!
    }
`;




//
const resolvers = {
  Query:  {
    getInventory: async (_, { id }, { db }) => {
      const inventory =  await db.collection('Inventory').findOne( {id: id });
      const items = inventory.items;
      return items
    },

    // created this area to create an item and save it to the database
    getItem: async (_, { id }, { db }) => {
      return await db.collection('Item').findOne({ _id: ObjectID(id) });
    },

     
  

    getAisle: async(_, { id }, { db }) => {
      return await db.collection('Aisles').findOne({ _id: ObjectID(id) });
    },

    getMap: async (_, { id }, { db }) => {
      return await db.collection('Map').findOne({ _id: ObjectID(id) });
    },
  
    getAllMapCoords: async (_, { id }, { db}) => {
      const map = await db.collection('Map').findOne({ _id: ObjectID(id) })
      if(!map) {
        throw new Error('Map not found');
      }
      const data = [];
      for(let x = 0; x < width; x++) {
        for(let y = 0; y < length; y++) {
          data.push([x,y]);
        }        
      }
      return data;
    },

  },
  Mutation: {
    createInventory: async(_, { title, id }, { db }) => {
      const currItems = await db.collection('Item').find().toArray();
      const newInventory = {
        id: id,
        title: title,
        items: currItems
      }

      const result = await db.collection('Inventory').insert(newInventory);

      return result.ops[0]
    },

    //created this area to create an item and save it to the database
    createItem:async(_, {name, aisle, bay, price, xVal, yVal},{db}) => {

      //what is need for the item to be created and what time it was created at
      const newItem = {name, aisle, bay, price, xVal, yVal, createdAt: new Date().toISOString()
      }
      
      const result = await db.collection('Item').insert(newItem);
      return result.ops[0];
      },

    createAisle: async(_, { number, name, xStartVal, xEndVal, yStartVal, yEndVal }, { db }) => {

      const width = (xEndVal - xStartVal) + 1;
      const length = (yEndVal - yStartVal) + 1;

      // bays are not unique identifiers like aisles
      // three bays per aisle
      const horizonBayLength = width/3; 
      const vertBayLength = length/3;

      // 1st bay starts = startVal
      // 1st bay ends = starts + (bay length - 1)
      const bayCoordinates = [];
      if( width > length ) {
        for(let i = 0; i <= width; i++) {
          if (i == horizonBayLength) {

            const horizonFirstBayEnd = xStartVal + (i - 1);
            bayCoordinates.push([xStartVal,horizonFirstBayEnd]);

          } else if (i == (horizonBayLength*2)) {
            
            const horizonSecondBay = xStartVal + (horizonBayLength);
            const horizonSecondBayEnd = xStartVal + (i - 1);
            bayCoordinates.push([horizonSecondBay,horizonSecondBayEnd]);

          } else if (i == (horizonBayLength*3)) {

            const horizonThirdBay = xStartVal + (horizonBayLength*2);
            const horizonThirdBayEnd = xEndVal;
            bayCoordinates.push([horizonThirdBay,horizonThirdBayEnd]);

          }
        }
      } else {

        for(let i = 0; i <= length; i++) {
          if (i == vertBayLength) {

            const vertFirstBayEnd = yStartVal + (i - 1);
            bayCoordinates.push([yStartVal,vertFirstBayEnd]);

          } else if (i == (vertBayLength*2)) {
            
            const vertSecondBay = yStartVal + (vertBayLength);
            const vertSecondBayEnd = yStartVal + (i - 1);
            bayCoordinates.push([vertSecondBay,vertSecondBayEnd]);

          } else if (i == (vertBayLength*3)) {

            const vertThirdBay = yStartVal + (vertBayLength*2);
            const vertThirdBayEnd = yEndVal;
            bayCoordinates.push([vertThirdBay,vertThirdBayEnd]);
            
          }
        }
      }

      const newAisle = {
        number,
        name,
        bays: bayCoordinates,
        xStartVal,
        xEndVal,
        yStartVal,
        yEndVal
      }

      // insert newAisle object into database
      const result = await db.collection('Aisles').insert(newAisle);
      return result.ops[0];
  },

  createMap: async (_, { title, description, width, length }, { db }) => { 

    if(await db.collection('Map').findOne({ title: title })) { throw new Error('Map already exists') }

    if(!(width > 0 && length > 0)) { throw new Error('Invalid map dimensions. Must have an area of at least 1 unit') }

    const aisles = await db.collection('Aisles').find().toArray();
    const checkoutLanes = await db.collection('Checkout').find().toArray();
    const entrances = await db.collection('Doors').find().toArray();

    const validateRange = (x, y, min, max) => {
      return x >= min && y <= max
    }

    const validateObject = (obj, objName) => {
      obj.forEach( (element) => {
        if(!(validateRange(element.xStartVal, element.xEndVal, 0, width)
          && validateRange(element.yStartVal, element.yEndVal, 0, length))) { 
            throw new Error(`${objName} dimensions exceed map dimensions`)
        }
        
      });
    }

    validateObject(aisles, "Aisle")
    validateObject(checkoutLanes, "Checkout lane")
    validateObject(entrances, "Entrance")

    // aisles.forEach(aisle => {
    //   if(!(validateRange(aisle.xStartVal, aisle.xEndVal, 0, width)
    //       && validateRange(aisle.yStartVal, aisle.yEndVal, 0, length))) { 
    //         throw new Error(`Aisle dimensions exceed map dimensions`)
    //       }
    // });

    // checkoutLanes.forEach(cLane => {
    //   if(!(validateRange(cLane.xStartVal, cLane.xEndVal, 0, width)
    //       && validateRange(cLane.yStartVal, cLane.yEndVal, 0, length))) { 
    //         throw new Error(`Checkout lane dimensions exceed map dimensions`)
    //       }
    // });

    // entrances.forEach(door => {
    //   if(!(validateRange(door.xStartVal, door.xEndVal, 0, width)
    //       && validateRange(door.yStartVal, door.yEndVal, 0, length))) { 
    //         throw new Error(`Entrance dimensions exceed map dimensions`)
    //       }
    // });
    
    const newMap = {
      title,
      description,
      width,
      length,
      aisle: aisles,
      checkout: checkoutLanes,
      entrance: entrances
    }
    
    const result = await db.collection('Map').insert(newMap);

    return result.ops[0]
  },
  
  createCheckout: async(_, { lane, xStartVal, xEndVal, yStartVal, yEndVal } , { db }) => {
    const newLane = {
      lane,
      xStartVal,
      xEndVal,
      yStartVal,
      yEndVal
    }
    
    const result = await db.collection('Checkout').insert(newLane);

    return result.ops[0]
  },

  createDoor: async(_, { name, xStartVal, xEndVal, yStartVal, yEndVal } , { db }) => {
    const newDoor = {
      name,
      xStartVal,
      xEndVal,
      yStartVal,
      yEndVal
    }
    
    const result = await db.collection('Doors').insert(newDoor);

    return result.ops[0]
  },

  },

   // did this so then Aisle.id in Apollo wouldn't give an error for non-nullable fields
  Aisle: {
    id: ({ _id, id }) => _id || id,  
  },

  //Error for non-nullable fields
  Item: {
    id: ({ _id, id }) => _id || id,  
  },
  
  StoreMap: {
    id: ({ _id, id }) => _id || id,
  },
  Item:{
    id: ( { _id, id }) => _id || id,
    },
};
      
  
    




const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME); // defines the database
  //we wait to connect the sever untill  we connect to the database we will start the server
  //we need a connection to the server in order to have access to the data

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