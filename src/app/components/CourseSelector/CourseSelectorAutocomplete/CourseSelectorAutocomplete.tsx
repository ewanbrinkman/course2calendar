import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";

interface CourseSelectorAutocompleteProps {
  label: string;
  placeholder: string;
  data: string[] | null | undefined;
  valid: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  error: string | null;
  setError: (value: string | null) => void;
}

export default function CourseSelectorAutocomplete(
  props: CourseSelectorAutocompleteProps
) {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput("");

    if (props.data === null) {
      props.setError("Unable to fetch. Please try again later.");
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
      props.setError("Please select a valid value from the dropdown.");
    }
  };

  const onFocus = () => {
    if (props.error !== null) {
      setInput("");
      props.setError(null);
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
      error={props.error}
      disabled={props.disabled}
    />
  );
}
