import { useEffect, useState } from "react";
import { Input, InputBase, Combobox, useCombobox, Text } from "@mantine/core";

interface TermSelectorComboboxProps<T> {
  placeholder: string;
  data: string[] | null | undefined;
  onOptionSubmit: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function TermSelectorCombobox<T>(
  props: TermSelectorComboboxProps<T>
) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    setValue(null);
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
      {props.error && props.errorMessage && (
        <Text color="red" size="sm" mt="xs">
          {props.errorMessage}
        </Text>
      )}
    </div>
  );
}
