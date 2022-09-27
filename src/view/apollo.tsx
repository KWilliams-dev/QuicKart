import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const URI = 'http://172.16.0.8:4000/quickkart';

const httpLink = createHttpLink({
  uri: URI,
})

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
  });
  
