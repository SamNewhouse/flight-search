import { FC } from "react";

interface Flight {
  flightNumber: string;
  airline: string;
  departureCity: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  co2Emissions: number;
  distance?: number;
}

interface Props {
  flights: Flight[];
}

// Function to calculate flight duration in hours & minutes
const calculateDuration = (departure: string, arrival: string) => {
  const departureTime = new Date(departure).getTime();
  const arrivalTime = new Date(arrival).getTime();
  const durationMs = arrivalTime - departureTime;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const FlightResults: FC<Props> = ({ flights }) => {
  if (!flights.length) {
    return <p className="text-center text-gray-600">No flights found.</p>;
  }

  return (
    <div className="space-y-6">
      {flights.map((flight, index) => (
        <div key={index} className="border p-6 rounded-lg shadow-md bg-white">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-bold text-gray-800">
              {flight.flightNumber} - {flight.airline}
            </h2>
            <span className="text-gray-600 font-semibold">£{flight.price.toFixed(2)}</span>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Departure:</p>
              <p>{flight.departureCity}</p>
              <p className="text-gray-600">{new Date(flight.departureTime).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Arrival:</p>
              <p>{flight.destinationCity}</p>
              <p className="text-gray-600">{new Date(flight.arrivalTime).toLocaleString()}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Distance:</span> {flight.distance}km
            </p>
            <p>
              <span className="font-semibold">CO₂ Emissions:</span> {flight.co2Emissions}kg
            </p>
            <p>
              <span className="font-semibold">Flight Duration:</span> {calculateDuration(flight.departureTime, flight.arrivalTime)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
