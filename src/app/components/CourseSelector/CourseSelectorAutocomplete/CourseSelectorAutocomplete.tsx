import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";

interface CourseSelectorAutocompleteProps<T> {
  label: string;
  placeholder: string;
  data: { value: T; valueAsString: string }[] | null | undefined;
  valid: boolean;
  onChange: (value: T | null) => void;
  disabled?: boolean;
  error: string | null;
  setError: (value: string | null) => void;
  formatValue: (value: string) => string;
}

export default function CourseSelectorAutocomplete<T>(
  props: CourseSelectorAutocompleteProps<T>
) {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput("");

    if (props.data === null) {
      props.setError("Unable to fetch. Please try again later.");
    }
  }, [props.data]);

  const onChange = (value: string) => {
    if (props.data === undefined) {
      return;
    }

    const formattedValue = props.formatValue(value);

    setInput(formattedValue);

    if (props.data === null) {
      return;
    }

    props.onChange(
      props.data.find((valueData) => valueData.valueAsString === formattedValue)
        ?.value ?? null
    );
  };

  const onBlur = () => {
    if (!props.valid && input !== "") {
      props.setError("Please select a valid value from the dropdown.");
    }
  };

  const onFocus = () => {
    if (props.error !== null) {
      setInput("");
      if (props.data !== null) {
        props.setError(null);
      }
    }
  };

  return (
    <Autocomplete
      label={props.label}
      placeholder={props.placeholder}
      data={props.data?.map((valueData) => valueData.valueAsString) || []}
      value={input}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={props.error}
      disabled={props.disabled}
    />
  );
}
