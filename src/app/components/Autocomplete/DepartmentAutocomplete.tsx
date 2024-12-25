"use client";

import { useEffect, useState } from "react";
import BaseAutocomplete from "./BaseAutocomplete";
import courseApiWrapper from "course-api-wrapper";

interface DepartmentAutocompleteProps {
  onMatch: (department: string | null) => void;
  onBlur: () => void;
}

export default function DepartmentAutocomplete(
  props: DepartmentAutocompleteProps
) {
  const [departments, setDepartments] = useState<string[] | null | undefined>(
    undefined
  );

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

  return (
    <BaseAutocomplete
      label="Select Department"
      placeholder="Start typing a department ID"
      data={departments}
      onMatch={props.onMatch}
      onBlur={props.onBlur}
    />
  );
}
