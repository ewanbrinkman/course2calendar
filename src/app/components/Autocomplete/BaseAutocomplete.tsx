import { Autocomplete } from "@mantine/core";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface BaseAutocompleteProps {
  label: string;
  placeholder: string;
  data: string[] | null | undefined;
  onMatch: (value: string | null) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export default function BaseAutocomplete(props: BaseAutocompleteProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.data === null) {
      setError("Unable to fetch. Please try again later.");
    }
  }, [props.data]);

  const onChange = (value: string) => {
    setInput(value);

    // Send data to parent early before submit, so can fetch data before the user needs it.
    const formattedInput = value.toUpperCase();
    if (props.data && props.data.includes(formattedInput)) {
      // Don't replace `input` with the formatted input though. This is done without informing the user.
      props.onMatch(formattedInput);
    }
  };

  const onBlur = () => {
    const formattedInput = input.toUpperCase();
    if (props.data && props.data.includes(formattedInput)) {
      setInput(formattedInput);
      props.onBlur();

      setError(null);
    } else if (input !== "") {
      props.onMatch(null);
      props.onBlur();

      setError("Please select a valid department from the dropdown.");
    }
  };

  const onFocus = () => {
    if (error !== null) {
      setInput("");
      setError(null);
    }
  };

  return (
    <Autocomplete
      label={props.label}
      placeholder={props.placeholder}
      data={props.data || []}
      value={input}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      disabled={props.disabled}
    />
  );
}
