"use client";
import { useState } from "react";
import { Text } from "@mantine/core";
import DepartmentAutocomplete from "./components/Autocomplete/DepartmentAutocomplete";
import CourseAutocomplete from "./components/Autocomplete/CourseAutocomplete";
export default function Home() {
  const [department, setDepartment] = useState<string | null>(null);
  const [departmentSelected, setDepartmentSelected] = useState<boolean>(false);

  const [courseNumber, setCourseNumber] = useState<string | null>(null);
  const [courseNumberSelected, setCourseNumberSelected] =
    useState<boolean>(false);

  const updateDepartment = (value: string | null, selected: boolean) => {
    setDepartment(value);
    setDepartmentSelected(selected);
  };

  const updateCourseNumber = (value: string | null, selected: boolean) => {
    setCourseNumber(value);
    setCourseNumberSelected(selected);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl">Department Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Department: {department ?? "null"}</Text>
      <Text>Selected: {departmentSelected ? "true" : "false"}</Text>

      <DepartmentAutocomplete updateValue={updateDepartment} />

      <div style={{ marginTop: "200px" }}></div>

      <Text size="xl">Course Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Course: {courseNumber ?? "null"}</Text>
      <Text>Selected: {courseNumberSelected ? "true" : "false"}</Text>
      <CourseAutocomplete
        department={department}
        departmentSelected={departmentSelected}
        updateValue={updateCourseNumber}
      />
    </div>
  );
}
