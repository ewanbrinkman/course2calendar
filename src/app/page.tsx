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
import CourseSectionSelector from "@/app/components/CourseSelector";
import TermSelector from "@/app/components/TermSelector";
import { useEffect, useState, useMemo } from "react";
import courseApiWrapper, { CourseSection, Term } from "course-api-wrapper";
import ical, { ICalCalendarMethod } from "ical-generator";

export default function Home() {
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

  const downloadCalendarFile = () => {
    const calendar = ical({ name: "my first iCal" });

    // A method is required for outlook to display event as an invitation
    calendar.method(ICalCalendarMethod.REQUEST);

    const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(startTime.getHours() + 1);
    calendar.createEvent({
      start: startTime,
      end: endTime,
      summary: "Example Event",
      description: "It works ;)",
      location: "my room",
      url: "http://sebbo.net/",
    });
    const calendarBlob = new Blob([calendar.toString()], {
      type: "text/calendar",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(calendarBlob);
    link.download = "courses.ics"; // Name the downloaded file
    link.click();
  };

  return (
    <div className="flex flex-grow flex-col items-center p-8 space-y-8">
      <Title size="h2">Select A Year and Term</Title>

      <TermSelector updateTermSelection={updateTermSelection} />

      <Divider className="w-full" />

      <Title size="h2">Search for Courses</Title>

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
        onClick={downloadCalendarFile}
      >
        Download Calendar File
      </Button>
    </div>
  );
}
