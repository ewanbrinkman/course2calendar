"use client";

import { useEffect, useMemo, useState } from "react";
import courseApiWrapper, { Term } from "course-api-wrapper";
import CourseSelectorAutocomplete from "@components/CourseSelector/CourseSelectorAutocomplete";

interface CourseSectionSelectorProps {
  updateCourseSelection: (courseSelection: {
    department: string | null;
    courseNumber: string | null;
    section: string | null;
  }) => void;
  year: number | null;
  term: Term | null;
}

const LOADING_TEXT = "Loading...";
const NO_OFFERINGS_TEXT = "No Offerings";
const API_ERROR_TEXT = "";

export default function CourseSectionSelector(
  props: CourseSectionSelectorProps
) {
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
    if (department === value) {
      return;
    }

    if (departments && departments.includes(value)) {
      setDepartment(value);
      setCourseNumbers(undefined);
    } else {
      setDepartment(null);
    }
  };

  const onChangeCourseNumber = (value: string) => {
    if (courseNumber === value) {
      return;
    }

    if (courseNumbers && courseNumbers.includes(value)) {
      setCourseNumber(value);
      setSections(undefined);
    } else {
      setCourseNumber(null);
    }
  };

  const onChangeSection = (value: string) => {
    if (section === value) {
      return;
    }

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

    setDepartment(null);
    setDepartments(undefined);
    setCourseNumber(null);
    setCourseNumbers(undefined);
    setSection(null);
    setSections(undefined);

    const fetchDepartments = async () => {
      if (props.year === null || props.term === null) {
        setDepartment(null);
        setDepartments(undefined);

        setDepartmentError(null);

        return;
      }

      try {
        const data = await courseApiWrapper.departments(props.year, props.term);
        setDepartments(data.map((department) => department.id.toUpperCase()));
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setDepartments(null);
      }
    };

    fetchDepartments();
  }, [props.year, props.term]);

  useEffect(() => {
    props.updateCourseSelection({
      department: null,
      courseNumber: null,
      section: null,
    });

    const fetchCourseNumbers = async () => {
      if (
        props.year === null ||
        props.term === null ||
        department === null ||
        department === undefined
      ) {
        setCourseNumber(null);
        setCourseNumbers(undefined);

        setCourseNumberError(null);

        return;
      }

      try {
        const data = await courseApiWrapper.departmentCourseNumbers(
          department,
          props.year,
          props.term
        );
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
        props.year === null ||
        props.term === null ||
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
        const data = await courseApiWrapper.course(
          department,
          courseNumber,
          props.year,
          props.term
        );
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
    if (props.year === null || props.term === null) {
      return "Select A Year And Term First";
    } else if (departments === undefined) {
      return LOADING_TEXT;
    } else if (departments === null) {
      return API_ERROR_TEXT;
    } else if (departments.length === 0) {
      return NO_OFFERINGS_TEXT;
    } else {
      return `Select A Department (ex. ${departments[0]})`;
    }
  }, [props.year, props.term, departments]);

  const courseNumberPlaceholder = useMemo(() => {
    if (department === null) {
      return "Select A Department First";
    } else if (courseNumbers === undefined) {
      return LOADING_TEXT;
    } else if (courseNumbers === null) {
      return API_ERROR_TEXT;
    } else if (courseNumbers.length === 0) {
      return NO_OFFERINGS_TEXT;
    } else {
      return `Select A Number (ex. ${courseNumbers[0]})`;
    }
  }, [department, courseNumbers]);

  const sectionPlaceholder = useMemo(() => {
    if (courseNumber === null) {
      return "Select A Number First";
    } else if (sections === undefined) {
      return LOADING_TEXT;
    } else if (sections === null) {
      return API_ERROR_TEXT;
    } else if (sections.length === 0) {
      return NO_OFFERINGS_TEXT;
    } else {
      return `Select A Number (ex. ${sections[0]})`;
    }
  }, [courseNumber, sections]);

  useEffect(() => {
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
          disabled={
            !props.year ||
            !props.term ||
            !departments ||
            departments.length === 0
          }
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
          disabled={!department || !courseNumbers || courseNumbers.length === 0}
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
          disabled={!courseNumber || !sections || sections.length === 0}
          error={sectionError}
          setError={setSectionError}
        />
      </div>
    </div>
  );
}
