"use client";

import {
  Text,
  Button,
  Divider,
  Stack,
  Card,
  ActionIcon,
  Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import CourseSelector from "@components/CourseSelector";
import { useEffect, useState } from "react";
import courseApiWrapper, { CourseSection } from "course-api-wrapper";

export default function Home() {
  const [courseSelection, setCourseSelection] = useState<{
    department: string | null;
    courseNumber: string | null;
    section: string | null;
  }>({
    department: null,
    courseNumber: null,
    section: null,
  });
  const [selectedCourses, setSelectedCourses] = useState<
    { id: number; course: CourseSection }[]
  >([]);
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

  const addCourse = () => {
    if (
      !courseSection ||
      selectedCourses.some(
        (item) =>
          item.course.department === courseSection.department &&
          item.course.number === courseSection.number &&
          item.course.section === courseSection.section
      )
    ) {
      // No course selected, or course is already added.

      return;
    }

    setSelectedCourses((prev) => [
      ...prev,
      { id: Date.now(), course: courseSection },
    ]);

    setCourseSelection({ department: null, courseNumber: null, section: null });
  };

  const removeCourse = (id: number) => {
    setSelectedCourses((prev) => prev.filter((course) => course.id !== id));
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
      <Title size="h2">Select Year and Term</Title>

      <Divider className="w-full" />

      <Title size="h2">Search for a Course</Title>

      <CourseSelector
        updateCourseSelection={updateCourseSelection}
      ></CourseSelector>

      <Button
        onClick={addCourse}
        disabled={
          !courseSection ||
          selectedCourses.some(
            (item) =>
              item.course.department === courseSection.department &&
              item.course.number === courseSection.number &&
              item.course.section === courseSection.section
          )
        }
      >
        Add Course
      </Button>

      <Divider className="w-full" />

      <Title size="h2">Added Courses</Title>

      {selectedCourses.length === 0 ? (
        <Text size="lg">No courses added.</Text>
      ) : (
        <div className="flex items-center justify-center">
          <Stack className="w-full">
            {selectedCourses.map((item) => (
              <Card
                key={item.id}
                shadow="sm"
                padding="lg"
                withBorder
                className="w-96"
              >
                <div className="flex justify-between items-center">
                  {" "}
                  {/* Center delete button vertically */}
                  <div className="flex flex-col">
                    <Text size="md">
                      {item.course.department} {item.course.number}{" "}
                      {item.course.section}
                    </Text>
                    <Text size="xs">{item.course.title}</Text>
                  </div>
                  <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => removeCourse(item.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </div>
              </Card>
            ))}
          </Stack>
        </div>
      )}

      <Button
        disabled={selectedCourses.length === 0}
        onClick={() => {
          // Implement calendar download functionality here.
        }}
      >
        Download Calendar File
      </Button>
    </div>
  );
}
