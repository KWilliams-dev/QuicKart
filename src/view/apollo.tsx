import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';



const URI = 'http://192.168.1.203:19000/quickkart';
//
//
//

const httpLink = createHttpLink({
  uri: URI,
})

export const client = new ApolloClient({
    
    uri: URI,
    cache: new InMemoryCache(),
  });

// client
//   .query({
//     query: gql`
//       query getInventory() {

//         getInventory(id: $getInventoryId) {
//             id
//             name
//             aisle
//             bay
//             price
//             xVal
//             yVal
//           }
//       }
//     `
// }).then( (result) => console.log(result) );
  
