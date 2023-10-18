import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { IP, PORT } from './env';


// const URI = 'http://'+ IP + ':4000/quickkart';

const URI = IP + PORT;

const httpLink = createHttpLink({
  uri: URI,
})

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
  });