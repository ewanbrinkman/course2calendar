"use client";

import { useEffect, useState } from "react";
import BaseAutocomplete from "./CourseIdentifierAutocomplete";

interface DepartmentAutocompleteProps {
  updateValue: (department: string | null, selected: boolean) => void;
}

export default function DepartmentAutocomplete(
  props: DepartmentAutocompleteProps
) {
  return (
    <BaseAutocomplete
      label="Select Department"
      placeholder="Start typing a department ID"
      data={departments}
      updateValue={props.updateValue}
    />
  );
}
