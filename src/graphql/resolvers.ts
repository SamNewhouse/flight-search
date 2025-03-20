import { GraphQLContext } from "../graphql/context";
import { getCache, setCache } from "../lib/redis"; // Import Redis functions
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
      const cacheKey = `flights:${JSON.stringify(args)}`;
      const cachedData = await getCache(cacheKey);

      if (cachedData) {
        console.log("🔵 Returning cached flight data");
        return cachedData;
      }

      console.log("🟢 Fetching flight data from DB...");
      const filters = Object.fromEntries(Object.entries(args).filter(([_, value]) => value !== undefined));

      const flights = await ctx.prisma.flight.findMany({
        where: filters,
        select: defaultSelectFields,
      });

      if (!flights.length) throw new Error("No flights found matching your criteria.");

      await setCache(cacheKey, flights, 300); // Cache for 5 minutes
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

      await setCache(cacheKey, flight, 600); // Cache for 10 minutes
      return flight;
    },
  },
};
