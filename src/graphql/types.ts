export interface FlightsArgs {
  departureCity?: string;
  destinationCity?: string;
  date?: string;
  airline?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface FlightByIdArgs {
  id: string;
}

export interface FlightFilters {
  departureCity: string;
  destinationCity: string;
  date: string;
  airline: string;
  minPrice: number;
  maxPrice: number;
}
