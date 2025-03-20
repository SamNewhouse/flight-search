import { FC, useEffect, useRef, useState } from "react";
import { airlines } from "../../lib/constants/flights";
import { handleKeyDown } from "../../lib/functions/helpers";
import Input from "./Input";
import Label from "./Label";

interface AirlineAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const AirlineAutocomplete: FC<AirlineAutocompleteProps> = ({ value, onChange, onSubmit }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const filteredAirlines = airlines.filter((a) => a.name.toLowerCase().includes(value.toLowerCase()));

  useEffect(() => {
    if (highlightedIndex !== null && listRef.current) {
      const selectedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative">
      <Label>Airline</Label>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(e.target.value.length > 0);
          setHighlightedIndex(null);
        }}
        onKeyDown={(e) => handleKeyDown(e, highlightedIndex, setHighlightedIndex, filteredAirlines, onChange, setShowSuggestions, onSubmit)}
        onFocus={() => setShowSuggestions(value.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="e.g. British Airways"
        className="w-full p-2 border rounded-lg shadow-sm focus:ring focus:border-blue-500"
      />

      {showSuggestions && filteredAirlines.length > 0 && (
        <ul ref={listRef} className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-44 overflow-y-auto">
          {filteredAirlines.map((a, index) => (
            <li
              key={a.code}
              className={`px-4 py-2 cursor-pointer transition ${index === highlightedIndex ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-800"}`}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur before selection
                onChange(a.name);
                setShowSuggestions(false);
                setTimeout(onSubmit, 0); // Submit the form after selecting
              }}
            >
              {a.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirlineAutocomplete;
