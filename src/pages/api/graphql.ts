import { createSchema, createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "../../graphql/context";
import { schema } from "../../graphql/schema";

const yoga = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({ typeDefs: schema }),
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  landingPage: true,
  maskedErrors: false,
});

// Next.js API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return yoga(req, res);
}

// Disable Next.js body parsing (GraphQL handles it)
export const config = {
  api: {
    bodyParser: false,
  },
};
