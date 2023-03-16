import { ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-unfetch";

export const client = new ApolloClient({
  uri: "http://localhost:3001",
  cache: new InMemoryCache(),
  fetch,
});
