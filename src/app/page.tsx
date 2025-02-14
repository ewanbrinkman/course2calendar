"use client";

import {
  Text,
  Button,
  Divider,
  Stack,
  Card,
  ActionIcon,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import CourseSectionSelector from "@components/CourseSelector";
import TermSelector from "@components/TermSelector";
import ImportTutorial from "@components/ImportTutorial";
import { useEffect, useState, useMemo } from "react";
import courseApiWrapper, { CourseSection, Term } from "course-api-wrapper";
import downloadCalendarFile from "@utils/downloadCalendarFile";

export default function Home() {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    // This prevents white flickering for the dark theme.
    setColorScheme("dark");
  }, []);

  const [termSelection, setTermSelection] = useState<{
    year: number | null;
    term: Term | null;
  }>({
    year: null,
    term: null,
  });
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

  const updateTermSelection = (termSelection: {
    year: number | null;
    term: Term | null;
  }) => {
    setTermSelection(termSelection);
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

    // setCourseSelection({ department: null, courseNumber: null, section: null });
  };

  const removeCourse = (id: number) => {
    setSelectedCourses((prev) => prev.filter((course) => course.id !== id));
  };

  useEffect(() => {
    const fetchCourseSection = async () => {
      if (
        !termSelection.year ||
        !termSelection.term ||
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
          courseSelection.section,
          termSelection.year,
          termSelection.term
        );
        setCourseSection(data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setCourseSection(null);
      }
    };

    fetchCourseSection();
  }, [courseSelection]);

  useEffect(() => {
    // Remove all selected courses when the year or term changes.
    setSelectedCourses([]);
  }, [termSelection]);

  const addCourseButtonText = useMemo(() => {
    if (
      courseSelection &&
      selectedCourses.some(
        (item) =>
          item.course.department === courseSelection.department &&
          item.course.number === courseSelection.courseNumber &&
          item.course.section === courseSelection.section
      )
    ) {
      return "Course Already Added";
    } else if (
      courseSection === null &&
      courseSelection.department !== null &&
      courseSelection.courseNumber !== null &&
      courseSelection.section !== null
    ) {
      return "Loading Course Data...";
    } else {
      return "Add Course";
    }
  }, [courseSection, courseSelection, selectedCourses]);

  return (
    <div className="flex flex-grow flex-col items-center p-8 space-y-8">
      <Title size="h2">Select A Year And Term</Title>

      <TermSelector updateTermSelection={updateTermSelection} />

      <Divider className="w-full" />

      <Title size="h2">Search For Courses</Title>

      <CourseSectionSelector
        year={termSelection.year}
        term={termSelection.term}
        updateCourseSelection={updateCourseSelection}
      />

      {/* <Text>Found course: {courseSection ? courseSection.title : "None"}</Text> */}

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
        {addCourseButtonText}
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
          if (!termSelection.year || !termSelection.term) {
            return;
          }

          downloadCalendarFile(
            selectedCourses.map((selectedCourse) => selectedCourse.course),
            termSelection.year,
            termSelection.term
          );
        }}
      >
        Download Calendar File
      </Button>

      <Divider className="w-full" />

      <Title size="h2" className="text-center">
        How To Import The Downloaded File To A Calendar
      </Title>

      <Text className="text-center italic">
        You may need to refresh/reload your calendar for the imported events to
        appear.
      </Text>

      <Text className="text-center">
        Steps for some select calendar services are below.
      </Text>

      <ImportTutorial />
    </div>
  );
}
