import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:8000/khemarakql",
  credentials: 'same-origin',
});

const  apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});  

export default apolloProvider