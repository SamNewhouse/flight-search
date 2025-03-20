import { faker } from "@faker-js/faker";
import { airlines, cityPairs } from "../lib/constants/flights";
import { calculateCO2, calculateFlightDuration, getRandomDepartureTime } from "../lib/functions/flights";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.flight.deleteMany();

  // Generate realistic flight data
  const flights = Array.from({ length: 350 }, () => {
    const { departure, destination, distance } = faker.helpers.arrayElement(cityPairs);
    const airline = faker.helpers.arrayElement(airlines);
    const flightNumber = `${airline.code}${faker.string.numeric(4)}`;

    // Generate departure time and calculate arrival based on flight duration
    const departureTime = getRandomDepartureTime();
    const flightDurationMinutes = calculateFlightDuration(distance);
    const arrivalTime = new Date(departureTime.getTime() + flightDurationMinutes * 60000);

    return {
      flightNumber: flightNumber,
      airline: airline.name,
      departureCity: departure,
      destinationCity: destination,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      price: faker.number.float({ min: 100, max: 1500, multipleOf: 0.01 }),
      co2Emissions: Math.round(calculateCO2(distance) * 100) / 100,
      distance: distance,
      date: departureTime.toISOString().split("T")[0],
    };
  });

  await prisma.flight.createMany({ data: flights });

  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
