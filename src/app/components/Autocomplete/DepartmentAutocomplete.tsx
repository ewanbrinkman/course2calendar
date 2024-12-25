"use client";

import { useEffect, useState } from "react";
import BaseAutocomplete from "./BaseAutocomplete";
import courseApiWrapper from "course-api-wrapper";

interface DepartmentAutocompleteProps {
  onDepartmentSelect: (department: string | null) => void;
}

export default function DepartmentAutocomplete(
  props: DepartmentAutocompleteProps
) {
  const [departments, setDepartments] = useState<null | string[]>([]);

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
      onSelect={props.onDepartmentSelect}
    />
  );
}
