"use client";

import CourseSelector from "@components/CourseSelector";
import { useMantineColorScheme, Text, Button } from "@mantine/core";
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
      <Text>Add A Course</Text>
      <CourseSelector
        updateCourseSelection={updateCourseSelection}
      ></CourseSelector>

      <Text>Selected Course</Text>
      {courseSection ? (
        <>
          <Text>Name: {courseSection.title}</Text>
          <Text>
            Instructor{courseSection.instructors.length > 1 ? "s" : ""}:{" "}
            {courseSection.instructors
              .map((instructor) => instructor.commonName)
              .join(", ")}
          </Text>
          <Text>Department: {courseSection.department}</Text>
          <Text>Number: {courseSection.number}</Text>
          <Text>Section: {courseSection.section}</Text>
        </>
      ) : (
        <Text>No course selected or course not found.</Text>
      )}
      <Button onClick={() => setColorScheme("light")}>Light</Button>
      <Button onClick={() => setColorScheme("dark")}>Dark</Button>
      <Button onClick={() => setColorScheme("auto")}>Auto</Button>
      <iframe
        className="w-96"
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/artist/7bu3H8JO7d0UbMoVzbo70s?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
