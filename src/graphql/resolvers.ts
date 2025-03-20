import { GraphQLContext } from "../graphql/context";
import { getCache, setCache } from "../lib/redis";
import { FlightByIdArgs, FlightsArgs } from "./types";

// Default fields to select
const defaultSelectFields = {
  id: true,
  flightNumber: true,
  airline: true,
  departureCity: true,
  destinationCity: true,
  departureTime: true,
  arrivalTime: true,
  price: true,
  co2Emissions: true,
  distance: true,
};

export const resolvers = {
  Query: {
    flights: async (_parent: unknown, args: FlightsArgs, ctx: GraphQLContext) => {
      const filters = Object.fromEntries(Object.entries(args).filter(([_, value]) => value !== undefined));

      const flights = await ctx.prisma.flight.findMany({
        where: filters,
        select: defaultSelectFields,
      });

      if (!flights.length) throw new Error("No flights found matching your criteria.");
      return flights;
    },

    flightById: async (_parent: unknown, args: FlightByIdArgs, ctx: GraphQLContext) => {
      if (!args.id) throw new Error("Flight ID is required.");

      const cacheKey = `flight:${args.id}`;
      const cachedFlight = await getCache(cacheKey);

      if (cachedFlight) {
        console.log("🔵 Returning cached flight details");
        return cachedFlight;
      }

      console.log("🟢 Fetching flight details from DB...");
      const flight = await ctx.prisma.flight.findUnique({
        where: { id: args.id },
        select: defaultSelectFields,
      });

      if (!flight) throw new Error("Flight not found.");

      await setCache(cacheKey, flight, 1800);
      return flight;
    },
  },
};
