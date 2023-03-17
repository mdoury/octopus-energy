import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import fetch from "isomorphic-unfetch";

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    fetch,
    uri: 'http://localhost:3001',
  }),
  cache: new InMemoryCache(),
});