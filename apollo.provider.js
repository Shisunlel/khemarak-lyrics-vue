import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const isServe = false;
const isServer = true;
const host = isServer
  ? process.env.VUE_APP_ENDPOINT
  : isServe
  ? "http://192.168.0.190:8000/khemarakql"
  : "http://127.0.0.1:8000/khemarakql";

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  cache,
  uri: host,
  // credentials: "same-origin",
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
