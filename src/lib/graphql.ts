import { GraphQLClient } from "graphql-hooks";

const client = new GraphQLClient({
  url: "/api/graphql",
});

export default client;
