import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { IP } from './env';


const URI = 'http://'+ IP + ':4000/quickkart';

const httpLink = createHttpLink({
  uri: URI,
})

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
  });