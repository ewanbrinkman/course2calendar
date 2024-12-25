import { Autocomplete } from "@mantine/core";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface BaseAutocompleteProps {
  label: string;
  placeholder: string;
  data: string[] | null;
  onSelect: (value: string | null) => void;
  disabled?: boolean;
}

export default function BaseAutocomplete(props: BaseAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.data === null) {
      setError("Unable to fetch departments. Please try again later.");
    }
  }, [props.data]);

  // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  //   // if (event.key === "Enter") {
  //   //   handleSelect(inputValue);
  //   //   inputRef.current?.blur();
  //   // }
  // };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (value: string) => {
    const formattedValue = value.toUpperCase();
    if (props.data && props.data.includes(formattedValue)) {
      setInputValue(formattedValue);
      props.onSelect(formattedValue);
      setError(null);
    } else if (inputValue !== "") {
      props.onSelect(null);
      setError("Please select a valid department from the dropdown.");
    }
  };

  const handleFocus = () => {
    if (error !== null) {
      setInputValue("");
      setError(null);
    }
  };

  return (
    <Autocomplete
      ref={inputRef}
      label={props.label}
      placeholder={props.placeholder}
      data={props.data || []}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={() => handleSelect(inputValue)} // Validate on blur
      onFocus={handleFocus}
      error={error}
      disabled={props.disabled}
    />
  );
}
