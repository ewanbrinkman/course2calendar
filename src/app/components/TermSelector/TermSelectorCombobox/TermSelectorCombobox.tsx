import { useEffect, useState } from "react";
import { Input, InputBase, Combobox, useCombobox, Text } from "@mantine/core";
import classes from "./TermSelectorCombobox.module.css";

interface TermSelectorComboboxProps<T> {
  label: string;
  placeholder: string;
  data: string[] | null | undefined;
  onOptionSubmit: (value: string) => void;
}

export default function TermSelectorCombobox<T>(
  props: TermSelectorComboboxProps<T>
) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(null);

    if (props.data === null) {
      setError("Unable to fetch. Please try again later.");
    } else {
      setError(null);
    }
  }, [props.data]);

  const [value, setValue] = useState<string | null>(null);

  const options = props.data?.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const isDisabled = !props.data || props.data.length === 0;

  return (
    <div>
      <Text size="sm">{props.label}</Text>
      <Combobox
        store={combobox}
        onOptionSubmit={(value) => {
          setValue(value);
          props.onOptionSubmit(value);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            disabled={isDisabled}
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents={isDisabled ? "none" : "all"}
            onClick={() => {
              if (!isDisabled) {
                combobox.toggleDropdown();
              }
            }}
            styles={{
              input: {
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.6 : 1,
                borderColor: error ? "var(--mantine-color-error)" : undefined,
                marginBottom: error
                  ? "calc(var(--mantine-spacing-xs) / 2)"
                  : undefined,
              },
            }}
          >
            {value || (
              <Input.Placeholder>{props.placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        {!isDisabled && (
          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        )}
      </Combobox>
      {error && (
        <Text
          className="errorText"
          size="xs"
          styles={{
            root: {
              color: "var(--mantine-color-error)",
            },
          }}
          // style={{ color: "var(--mantine-color-error)" }}
        >
          {error}
        </Text>
      )}
    </div>
  );
}
