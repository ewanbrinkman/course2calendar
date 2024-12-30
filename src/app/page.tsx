"use client";

import CourseSelector from "@components/CourseSelector";
import { useMantineColorScheme, Text, Button, Divider } from "@mantine/core";
import courseApiWrapper, { CourseSection } from "course-api-wrapper";
import { useEffect, useState } from "react";

export default function Home() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  const [courseSelection, setCourseSelection] = useState<{
    department: string | null;
    courseNumber: string | null;
    section: string | null;
  }>({
    department: null,
    courseNumber: null,
    section: null,
  });
  const [courseSection, setCourseSection] = useState<CourseSection | null>(
    null
  );

  const updateCourseSelection = (courseSelection: {
    department: string | null;
    courseNumber: string | null;
    section: string | null;
  }) => {
    setCourseSelection(courseSelection);
  };

  useEffect(() => {
    const fetchCourseSection = async () => {
      if (
        !courseSelection.department ||
        !courseSelection.courseNumber ||
        !courseSelection.section
      ) {
        setCourseSection(null);

        return;
      }

      try {
        const data = await courseApiWrapper.courseSection(
          courseSelection.department,
          courseSelection.courseNumber,
          courseSelection.section
        );
        setCourseSection(data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setCourseSection(null);
      }
    };

    fetchCourseSection();
  }, [courseSelection]);

  return (
    <div className="flex flex-grow flex-col items-center p-8 space-y-8">
      <Text size="xl">Search for a Course</Text>

      <CourseSelector
        updateCourseSelection={updateCourseSelection}
      ></CourseSelector>

      <Button>Add Course</Button>

      <Divider className="w-full" />

      <Text size="xl">Added Courses</Text>

      <Button>Download Calendar File</Button>
    </div>
  );
}
