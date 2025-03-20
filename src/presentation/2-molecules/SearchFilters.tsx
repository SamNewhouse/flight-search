import { FC, useState } from "react";
import AirlineAutocomplete from "../1-atoms/AirlineAutocomplete";
import Button from "../1-atoms/Button";
import DatePicker from "../1-atoms/DatePicker";

interface SearchFiltersProps {
  onSearch: (filters: { airline: string; date: string }) => void;
}

const SearchFilters: FC<SearchFiltersProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({ airline: "", date: "" });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Search Flights</h2>

      {/* Airline Selection */}
      <AirlineAutocomplete
        value={filters.airline}
        onChange={(airline) => setFilters((prev) => ({ ...prev, airline }))}
        onSubmit={handleSubmit} // Now correctly passes a no-argument function
      />

      {/* Date Picker */}
      <DatePicker onSelect={(date) => setFilters((prev) => ({ ...prev, date }))} />

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Search Flights
      </Button>
    </form>
  );
};

export default SearchFilters;
