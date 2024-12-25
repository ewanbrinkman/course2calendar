"use client";

import { useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import courseApiWrapper from "course-api-wrapper";
import CourseIdentifierAutocomplete from "@components/CourseIdentifierAutocomplete";

export default function Home() {
  const [department, setDepartment] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[] | null | undefined>(
    undefined
  );
  const [courseNumber, setCourseNumber] = useState<string | null>(null);
  const [courseNumbers, setCourseNumbers] = useState<
    string[] | null | undefined
  >(undefined);

  const onChangeDepartment = (value: string) => {
    if (departments && departments.includes(value)) {
      setDepartment(value);
    } else {
      setDepartment(null);
    }
  };
  const onChangeCourseNumber = (value: string) => {
    if (courseNumbers && courseNumbers.includes(value)) {
      setCourseNumber(value);
    } else {
      setCourseNumber(null);
    }
  };

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
        setCourseNumber(null);
        setCourseNumbers(undefined);

        return;
      }

      try {
        const data = await courseApiWrapper.departmentCourseNumbers(department);
        setCourseNumbers(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setCourseNumbers(null);
      }
    };

    fetchCourseNumbers();
  }, [department]);

  const departmentPlaceholder = useMemo(() => {
    if (departments) {
      if (departments.length > 0) {
        return `Select A Department (ex. ${departments[0]})`;
      } else {
        return "None Available";
      }
    } else {
      return "Loading...";
    }
  }, [departments]);
  const courseNumberPlaceholder = useMemo(() => {
    if (department !== null) {
      if (courseNumbers) {
        if (courseNumbers.length > 0) {
          return `Select A Number (ex. ${courseNumbers[0]})`;
        } else {
          return "None Available";
        }
      } else {
        return "Loading...";
      }
    } else {
      return "Select A Department First";
    }
  }, [department, courseNumbers]);

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl">Department Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Department: {department ?? "null"}</Text>

      <CourseIdentifierAutocomplete
        label="Department"
        placeholder={departmentPlaceholder}
        data={departments}
        valid={department !== null}
        onChange={onChangeDepartment}
      />

      <div style={{ marginTop: "200px" }}></div>

      <Text size="xl">Course Selector</Text>
      <div style={{ marginTop: "20px" }}></div>
      <Text>Matched Course: {courseNumber ?? "null"}</Text>

      <CourseIdentifierAutocomplete
        label="Number"
        placeholder={courseNumberPlaceholder}
        data={courseNumbers}
        valid={courseNumber !== null}
        onChange={onChangeCourseNumber}
        disabled={department === null}
      />
    </div>
  );
}
