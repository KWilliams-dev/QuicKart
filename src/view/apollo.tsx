import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const URI = 'http://<Your IP Address>:4000/quickkart';

const httpLink = createHttpLink({
  uri: URI,
})

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
  });
  
