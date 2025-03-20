import { FC, useState } from "react";
import Input from "./Input";
import Label from "./Label";

interface DatePickerProps {
  onSelect: (date: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onSelect(newDate);
  };

  return (
    <div className="relative">
      <Label>Date</Label>
      <Input type="date" value={selectedDate} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
};

export default DatePicker;
