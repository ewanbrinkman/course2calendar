"use client";
import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import CourseIdentifierAutocomplete from "./components/Autocomplete/CourseIdentifierAutocomplete";
import courseApiWrapper from "course-api-wrapper";

export default function Home() {
  const [department, setDepartment] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[] | null | undefined>(
    undefined
  );

  const [courseNumberDisabled, setCourseNumberDisabled] =
    useState<boolean>(true);
  const [courseNumber, setCourseNumber] = useState<string | null>(null);
  const [courseNumbers, setCourseNumbers] = useState<
    string[] | null | undefined
  >(undefined);
  const [pendingCourseNumbers, setPendingCourseNumbers] = useState<
    string[] | null | undefined
  >(undefined);

  const onBlurDepartment = (valid: boolean) => {
    setCourseNumberDisabled(!valid);

    if (valid) {
      setCourseNumbers(pendingCourseNumbers);
    } else {
      setDepartment(null);
    }
  };
  const onBlurCourseNumber = (valid: boolean) => {};

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await courseApiWrapper.departments();
        setDepartments(data.map((department) => department.id.toUpperCase()));
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setDepartments(null);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    const fetchCourseNumbers = async () => {
      if (department === null) {
        setCourseNumbers(undefined);
        setPendingCourseNumbers(undefined);

        return;
      }

      try {
        const data = await courseApiWrapper.departmentCourseNumbers(department);
        setPendingCourseNumbers(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setPendingCourseNumbers(null);
      }
    };

    fetchCourseNumbers();
  }, [department]);

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl">Department Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Department: {department ?? "null"}</Text>

      <CourseIdentifierAutocomplete
        label="Department"
        placeholder="Start typing a department ID"
        data={departments}
        onMatch={setDepartment}
        onBlur={onBlurDepartment}
      />

      <div style={{ marginTop: "200px" }}></div>

      <Text size="xl">Course Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Course: {courseNumber ?? "null"}</Text>

      <CourseIdentifierAutocomplete
        label="Number"
        placeholder={
          courseNumberDisabled
            ? "Select A Department"
            : "Start typing a course number"
        }
        data={courseNumbers}
        onMatch={setCourseNumber}
        onBlur={onBlurCourseNumber}
        disabled={courseNumberDisabled}
      />
    </div>
  );
}
