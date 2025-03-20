/**
 * GraphQL query to fetch flights with pagination support.
 */
export const GET_FLIGHTS_QUERY = `
  query GetFlights(
    $departureCity: String, 
    $destinationCity: String, 
    $date: String, 
    $airline: String, 
  ) {
    flights(
      departureCity: $departureCity, 
      destinationCity: $destinationCity, 
      date: $date, 
      airline: $airline, 
    ) {
      id
      flightNumber
      airline
      departureCity
      destinationCity
      departureTime
      arrivalTime
      price
      co2Emissions
      distance
    }
  }
`;

/**
 * List of predefined city pairs with approximate flight distances (in km).
 */
export const cityPairs = [
  { departure: "London", destination: "Paris", distance: 344 },
  { departure: "London", destination: "New York", distance: 5567 },
  { departure: "New York", destination: "Los Angeles", distance: 3940 },
  { departure: "Tokyo", destination: "Sydney", distance: 7820 },
  { departure: "Berlin", destination: "Rome", distance: 1184 },
  { departure: "Dubai", destination: "Mumbai", distance: 1925 },
  { departure: "Toronto", destination: "Chicago", distance: 702 },
  { departure: "San Francisco", destination: "Seattle", distance: 1093 },
  { departure: "Johannesburg", destination: "Cape Town", distance: 1400 },
  { departure: "Beijing", destination: "Singapore", distance: 4474 },
  { departure: "Los Angeles", destination: "Tokyo", distance: 8771 },
  { departure: "Paris", destination: "Dubai", distance: 5240 },
  { departure: "New York", destination: "London", distance: 5567 },
  { departure: "Sydney", destination: "Los Angeles", distance: 12051 },
  { departure: "Frankfurt", destination: "Bangkok", distance: 8981 },
  { departure: "Hong Kong", destination: "San Francisco", distance: 11129 },
  { departure: "Chicago", destination: "Miami", distance: 1913 },
  { departure: "Madrid", destination: "Mexico City", distance: 9080 },
  { departure: "Toronto", destination: "Vancouver", distance: 3356 },
  { departure: "Singapore", destination: "Sydney", distance: 6303 },
  { departure: "Dublin", destination: "Amsterdam", distance: 756 },
  { departure: "New Delhi", destination: "Singapore", distance: 4155 },
  { departure: "Rome", destination: "Athens", distance: 1053 },
  { departure: "Bangkok", destination: "Melbourne", distance: 7360 },
  { departure: "Helsinki", destination: "Stockholm", distance: 396 },
  { departure: "Mexico City", destination: "Bogotá", distance: 3158 },
  { departure: "Buenos Aires", destination: "Santiago", distance: 1138 },
  { departure: "Shanghai", destination: "Seoul", distance: 868 },
  { departure: "Montreal", destination: "Boston", distance: 494 },
  { departure: "Cape Town", destination: "Nairobi", distance: 4096 },
];

/**
 * List of real-world airlines with their official ICAO codes (3-letter codes).
 */
export const airlines = [
  { name: "British Airways", code: "BAW" },
  { name: "American Airlines", code: "AAL" },
  { name: "Delta Airlines", code: "DAL" },
  { name: "Air France", code: "AFR" },
  { name: "Lufthansa", code: "DLH" },
  { name: "Qatar Airways", code: "QTR" },
  { name: "Singapore Airlines", code: "SIA" },
  { name: "Emirates", code: "UAE" },
  { name: "Etihad Airways", code: "ETD" },
  { name: "Turkish Airlines", code: "THY" },
  { name: "KLM Royal Dutch Airlines", code: "KLM" },
  { name: "Japan Airlines", code: "JAL" },
  { name: "Qantas", code: "QFA" },
  { name: "United Airlines", code: "UAL" },
  { name: "Cathay Pacific", code: "CPA" },
  { name: "Swiss International Air Lines", code: "SWR" },
  { name: "Aer Lingus", code: "EIN" },
  { name: "Alaska Airlines", code: "ASA" },
  { name: "Hawaiian Airlines", code: "HAL" },
  { name: "Scandinavian Airlines", code: "SAS" },
  { name: "Finnair", code: "FIN" },
  { name: "Iberia", code: "IBE" },
  { name: "Austrian Airlines", code: "AUA" },
  { name: "Malaysia Airlines", code: "MAS" },
  { name: "EVA Air", code: "EVA" },
  { name: "Vietnam Airlines", code: "HVN" },
  { name: "Air Canada", code: "ACA" },
  { name: "Korean Air", code: "KAL" },
  { name: "China Airlines", code: "CAL" },
  { name: "Garuda Indonesia", code: "GIA" },
  { name: "Saudi Arabian Airlines", code: "SVA" },
  { name: "Thai Airways", code: "THA" },
  { name: "Air India", code: "AIC" },
  { name: "Virgin Atlantic", code: "VIR" },
  { name: "JetBlue Airways", code: "JBU" },
  { name: "Ryanair", code: "RYR" },
  { name: "EasyJet", code: "EZY" },
];
