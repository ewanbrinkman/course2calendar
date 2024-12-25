import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";

interface CourseIdentifierAutocompleteProps {
  label: string;
  placeholder: string;
  data: string[] | null | undefined;
  valid: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function CourseIdentifierAutocomplete(
  props: CourseIdentifierAutocompleteProps
) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInput("");

    if (props.data === null) {
      setError("Unable to fetch. Please try again later.");
    }
  }, [props.data]);

  const formatValue = (value: string) => {
    return value.toUpperCase();
  };

  const onChange = (value: string) => {
    const formattedValue = formatValue(value);

    setInput(formattedValue);
    props.onChange(formattedValue);
  };

  const onBlur = () => {
    if (!props.valid && input !== "") {
      setError("Please select a valid value from the dropdown.");
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
