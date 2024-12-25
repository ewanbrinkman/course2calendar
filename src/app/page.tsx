"use client";
import { useState } from "react";
import { Text } from "@mantine/core";
import DepartmentAutocomplete from "./components/Autocomplete/DepartmentAutocomplete";
// import CourseAutocomplete from "./components/Autocomplete/CourseAutocomplete";
export default function Home() {
  const [department, setDepartment] = useState<string | null>(null);
  const [departmentSelected, setDepartmentSelected] = useState<boolean>(false);

  const onMatchDepartment = (value: string | null) => {
    setDepartment(value);
    setDepartmentSelected(false);
  };

  const onBlurDepartment = () => {
    setDepartmentSelected(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl">Department Selector</Text>
      <div style={{ marginTop: "20px" }}>
        <Text>Matched Department: {department ?? "null"}</Text>
        <Text>Selected: {departmentSelected ? "true" : "false"}</Text>
      </div>
      <DepartmentAutocomplete
        onMatch={onMatchDepartment}
        onBlur={onBlurDepartment}
      />

      {/* <Text size="xl">Department Selector</Text>
      <CourseAutocomplete onDepartmentSelect={handleDepartmentSelect} />
      {selectedDepartment && (
        <div style={{ marginTop: "20px" }}>
          <Text size="lg">Selected Department:</Text>
          <Text>{selectedDepartment}</Text>
        </div>
      )} */}
    </div>
  );
}
