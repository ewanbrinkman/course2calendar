"use client";

import { useEffect, useState } from "react";
import BaseAutocomplete from "./CourseIdentifierAutocomplete";
import courseApiWrapper from "course-api-wrapper";

interface CourseAutocompleteProps {
  department: string | null;
  departmentSelected: boolean;
  updateValue: (course: string | null, selected: boolean) => void;
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
      if (props.department === null) {
        setPendingCourses(undefined);
      } else {
        setCourses(pendingCourses);
      }

      setDisabled(props.department === null);
    }
  }, [props.departmentSelected]);

  return (
    <BaseAutocomplete
      label="Select Department"
      placeholder={
        disabled ? "Select A Department" : "Start typing a course number"
      }
      data={courses}
      updateValue={props.updateValue}
      disabled={disabled}
    />
  );
}
