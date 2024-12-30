"use client";

import { useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import courseApiWrapper from "course-api-wrapper";
import CourseSelectorAutocomplete from "@components/CourseSelector/CourseSelectorAutocomplete";

interface CourseSelectorProps {
  updateCourseSelection: (courseSelection: {
    department: string | null;
    courseNumber: string | null;
    section: string | null;
  }) => void;
}

export default function CourseSelector(props: CourseSelectorProps) {
  const [departmentError, setDepartmentError] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[] | null | undefined>(
    undefined
  );

  const [courseNumberError, setCourseNumberError] = useState<string | null>(
    null
  );
  const [courseNumber, setCourseNumber] = useState<string | null>(null);
  const [courseNumbers, setCourseNumbers] = useState<
    string[] | null | undefined
  >(undefined);

  const [sectionError, setSectionError] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [sections, setSections] = useState<string[] | null | undefined>(
    undefined
  );

  const onChangeDepartment = (value: string) => {
    if (departments && departments.includes(value)) {
      setDepartment(value);
      setCourseNumbers(undefined);
    } else {
      setDepartment(null);
    }
  };

  const onChangeCourseNumber = (value: string) => {
    if (courseNumbers && courseNumbers.includes(value)) {
      setCourseNumber(value);
      setSections(undefined);
    } else {
      setCourseNumber(null);
    }
  };

  const onChangeSection = (value: string) => {
    if (sections && sections.includes(value)) {
      setSection(value);
    } else {
      setSection(null);
    }
  };

  useEffect(() => {
    props.updateCourseSelection({
      department: null,
      courseNumber: null,
      section: null,
    });

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
    props.updateCourseSelection({
      department: null,
      courseNumber: null,
      section: null,
    });

    const fetchCourseNumbers = async () => {
      if (department === null || department === undefined) {
        setCourseNumber(null);
        setCourseNumbers(undefined);

        setCourseNumberError(null);

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

  useEffect(() => {
    const fetchSections = async () => {
      if (
        department === null ||
        department === undefined ||
        courseNumber === null ||
        courseNumber === undefined
      ) {
        setSection(null);
        setSections(undefined);

        setSectionError(null);

        return;
      }

      try {
        const data = await courseApiWrapper.course(department, courseNumber);
        setSections(
          data.sectionNumbers.map((sectionNumber) =>
            sectionNumber.toUpperCase()
          )
        );
      } catch (err) {
        console.error("Failed to fetch sections:", err);
        setSections(null);
      }
    };

    fetchSections();
  }, [courseNumber]);

  const departmentPlaceholder = useMemo(() => {
    if (departments === undefined) {
      return "Loading...";
    } else if (departments === null) {
      return "API Error";
    } else if (departments.length === 0) {
      return "None Available";
    } else {
      return `Select A Department (ex. ${departments[0]})`;
    }
  }, [departments]);

  const courseNumberPlaceholder = useMemo(() => {
    if (department === null) {
      return "Select A Department First";
    } else if (courseNumbers === undefined) {
      return "Loading...";
    } else if (courseNumbers === null) {
      return "API Error";
    } else if (courseNumbers.length === 0) {
      return "None Available";
    } else {
      return `Select A Number (ex. ${courseNumbers[0]})`;
    }
  }, [department, courseNumbers]);

  const sectionPlaceholder = useMemo(() => {
    if (courseNumber === null) {
      return "Select A Number First";
    } else if (sections === undefined) {
      return "Loading...";
    } else if (sections === null) {
      return "API Error";
    } else if (sections.length === 0) {
      return "None Available";
    } else {
      return `Select A Number (ex. ${sections[0]})`;
    }
  }, [courseNumbers, sections]);

  useEffect(() => {
    if (!department || !courseNumber || !section) {
      return;
    }

    props.updateCourseSelection({ department, courseNumber, section });
  }, [section]);

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:flex-wrap lg:gap-8 lg:space-y-0">
      <div className="w-60">
        <CourseSelectorAutocomplete
          label="Department"
          placeholder={departmentPlaceholder}
          data={departments}
          valid={department !== null}
          onChange={onChangeDepartment}
          error={departmentError}
          setError={setDepartmentError}
        />
      </div>

      <div className="w-60">
        <CourseSelectorAutocomplete
          label="Number"
          placeholder={courseNumberPlaceholder}
          data={courseNumbers}
          valid={courseNumber !== null}
          onChange={onChangeCourseNumber}
          disabled={department === null}
          error={courseNumberError}
          setError={setCourseNumberError}
        />
      </div>

      <div className="w-60">
        <CourseSelectorAutocomplete
          label="Section"
          placeholder={sectionPlaceholder}
          data={sections}
          valid={section !== null}
          onChange={onChangeSection}
          disabled={courseNumber === null}
          error={sectionError}
          setError={setSectionError}
        />
      </div>
    </div>
  );
}
