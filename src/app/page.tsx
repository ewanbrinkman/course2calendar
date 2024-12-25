"use client";
import { useState } from "react";
import { Text } from "@mantine/core";
import DepartmentAutocomplete from "./components/Autocomplete/DepartmentAutocomplete";
import CourseAutocomplete from "./components/Autocomplete/CourseAutocomplete";
export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleDepartmentSelect = (department: string | null) => {
    setSelectedDepartment(department);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl">Department Selector</Text>
      <DepartmentAutocomplete onDepartmentSelect={handleDepartmentSelect} />
      {selectedDepartment && (
        <div style={{ marginTop: "20px" }}>
          <Text size="lg">Selected Department:</Text>
          <Text>{selectedDepartment}</Text>
        </div>
      )}

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
