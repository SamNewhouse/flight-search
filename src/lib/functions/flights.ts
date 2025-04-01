import { faker } from "@faker-js/faker";

const SHORT_HAUL_CO2_PER_KM = 0.15;
const LONG_HAUL_CO2_PER_KM = 0.1;
const AVERAGE_FLIGHT_SPEED_KMH = 850;

/**
 * Calculate CO₂ emissions based on distance
 */
export function calculateCO2(distance: number): number {
  return distance < 3700 ? distance * SHORT_HAUL_CO2_PER_KM : distance * LONG_HAUL_CO2_PER_KM;
}

/**
 * Calculate realistic flight duration including takeoff, landing, and cruising.
 */
export function calculateFlightDuration(distance: number): number {
  const baseDuration = Math.ceil((distance / AVERAGE_FLIGHT_SPEED_KMH) * 60);

  // Additional time for taxiing, takeoff, and landing (40 to 55 minutes)
  const extraTime = Math.floor(Math.random() * 16) + 40;

  return baseDuration + extraTime;
}

/**
 * Generates a random departure time in the future.
 */
export function getRandomDepartureTime(): Date {
  return faker.date.soon({ days: 90 }); // Random flight within the next 90 days
}
