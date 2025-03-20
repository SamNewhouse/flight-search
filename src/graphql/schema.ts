import { intArg, stringArg, floatArg, makeSchema, objectType, queryType } from "nexus";
import path from "path";
import { resolvers } from "./resolvers";

// Define the Flight type
const Flight = objectType({
  name: "Flight",
  definition(t) {
    t.string("id");
    t.string("flightNumber");
    t.string("airline");
    t.string("departureCity");
    t.string("destinationCity");
    t.string("departureTime");
    t.string("arrivalTime");
    t.float("price");
    t.float("co2Emissions");
    t.int("distance");
  },
});

// Define the Query type
const Query = queryType({
  definition(t) {
    t.list.field("flights", {
      type: "Flight",
      args: {
        departureCity: stringArg(),
        destinationCity: stringArg(),
        date: stringArg(),
        airline: stringArg(),
      },
      resolve: resolvers.Query.flights,
    });

    t.field("flightById", {
      type: "Flight",
      args: { id: stringArg() },
      resolve: resolvers.Query.flightById,
    });
  },
});

// Export schema
export const schema = makeSchema({
  types: [Query, Flight],
  contextType: {
    module: path.join(process.cwd(), "src/graphql/context.ts"),
    export: "createContext",
  },
});
