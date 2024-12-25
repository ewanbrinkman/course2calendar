"use client";

import { useEffect, useMemo, useState } from "react";
import BaseAutocomplete from "./BaseAutocomplete";
import courseApiWrapper from "course-api-wrapper";

interface CourseAutocompleteProps {
  department: string | null;
  departmentSelected: boolean;
  onMatch: (course: string | null) => void;
  onBlur: () => void;
}

export default function CourseAutocomplete(props: CourseAutocompleteProps) {
  const [disabled, setDisabled] = useState<boolean>(true);

  const [courses, setCourses] = useState<string[] | null | undefined>(
    undefined
  );
  const [pendingCourses, setPendingCourses] = useState<
    string[] | null | undefined
  >(undefined);

  useEffect(() => {
    const fetchCourses = async () => {
      if (props.department === null) {
        return;
      }

      try {
        const data = await courseApiWrapper.departmentCourseNumbers(
          props.department
        );
        setPendingCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setPendingCourses(null);
      }
    };

    fetchCourses();
  }, [props.department]);

  useEffect(() => {
    if (props.departmentSelected) {
      setCourses(pendingCourses);
      setDisabled(props.department === null);

      // Reset the current autocomplete value to an empty string.
    }
  }, [props.departmentSelected]);

  return (
    <BaseAutocomplete
      label="Select Department"
      placeholder={
        disabled ? "Select A Department" : "Start typing a course number"
      }
      data={courses}
      onMatch={props.onMatch}
      onBlur={props.onBlur}
      disabled={disabled}
    />
  );
}
