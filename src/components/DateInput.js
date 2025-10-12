import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const DateInput = ({ value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const wrapperRef = useRef(null);

  // Handle click outside to close calendar
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Set default value to current date if no value is provided
useEffect(() => {
  if (!value && required) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    onChange({
      target: {
        name: 'birthdate',
        value: formattedDate
      }
    });
    setInputValue(formattedDate);
  }
// ✅ Run only once
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setInputValue(formattedDate);
    onChange({
      target: {
        name: "birthdate",
        value: formattedDate,
      },
    });
    setIsOpen(false);
  };

  // Handle direct input
  const handleInputChange = (e) => {
    let input = e.target.value;

    // Allow empty value
    if (!input) {
      setInputValue("");
      onChange({
        target: {
          name: "birthdate",
          value: "",
        },
      });
      return;
    }

    // Keep original input with slashes
    let formatted = input;

    // If user is typing numbers, format them
    if (/^\d*$/.test(input.replace(/\//g, ""))) {
      let digitsOnly = input.replace(/\D/g, "");

      // Add slashes automatically
      if (digitsOnly.length > 0) {
        // Handle month (limit to 12)
        let month = digitsOnly.substring(0, 2);
        if (parseInt(month) > 12) month = "12";
        formatted = month;

        // Add day (limit to 31)
        if (digitsOnly.length > 2) {
          let day = digitsOnly.substring(2, 4);
          if (parseInt(day) > 31) day = "31";
          formatted = `${month}/${day}`;

          // Add year
          if (digitsOnly.length > 4) {
            let year = digitsOnly.substring(4, 8);
            formatted = `${month}/${day}/${year}`;
          }
        }
      }
    }

    // Limit to MM/DD/YYYY format length
    formatted = formatted.substring(0, 10);

    // Always update the input value to show what was typed
    setInputValue(formatted);

    // Only try to create a Date object if we have a complete date
    if (formatted.length === 10) {
      const [month, day, year] = formatted.split("/");
      const dateObj = new Date(year, month - 1, day);

      // Only update if it's a valid date
      if (dateObj instanceof Date && !isNaN(dateObj)) {
        onChange({
          target: {
            name: "birthdate",
            value: formatted,
          },
        });
      }
    } else {
      // For partial input, just pass the formatted string
      onChange({
        target: {
          name: "birthdate",
          value: formatted,
        },
      });
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10"
          required={required}
          maxLength={10}
          onClick={() => setIsOpen(true)}
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Calendar className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1">
          <DatePicker
            selected={
              inputValue && !isNaN(new Date(inputValue).getTime())
                ? new Date(inputValue)
                : null
            }
            onChange={handleDateChange}
            inline
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            className="shadow-lg border rounded-full-lg bg-black"
          />
        </div>
      )}

      {!inputValue && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          MM/DD/YYYY
        </div>
      )}
    </div>
  );
};

export default DateInput;
