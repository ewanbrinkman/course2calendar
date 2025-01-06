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
import CourseSectionSelector from "@components/CourseSelector";
import TermSelector from "@components/TermSelector";
import ImportTutorial from "@components/ImportTutorial";
import { useEffect, useState, useMemo } from "react";
import courseApiWrapper, { CourseSection, Term } from "course-api-wrapper";
import ical, {
  ICalCalendarMethod,
  ICalEventRepeatingFreq,
} from "ical-generator";

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
    if (selectedCourses.length === 0) {
      return;
    }

    const calendar = ical({ name: "Course Schedule" });
    calendar.method(ICalCalendarMethod.PUBLISH);

    selectedCourses.forEach(({ course }) => {
      course.schedule.forEach((schedulePart) => {
        const daysOfWeekMap: Record<string, number> = {
          Mo: 1,
          Tu: 2,
          We: 3,
          Th: 4,
          Fr: 5,
          Sa: 6,
          Su: 0,
        };

        const startDate = new Date(schedulePart.startDate);
        const endDate = new Date(schedulePart.endDate);
        const startTimeParts = schedulePart.startTime.split(":");
        const endTimeParts = schedulePart.endTime.split(":");
        const courseStartTime = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          parseInt(startTimeParts[0]),
          parseInt(startTimeParts[1])
        );
        const courseEndTime = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          parseInt(endTimeParts[0]),
          parseInt(endTimeParts[1])
        );

        schedulePart.days.forEach((day) => {
          const dayOffset = daysOfWeekMap[day];
          if (dayOffset === undefined) return;

          const adjustedStartTime = new Date(courseStartTime);
          adjustedStartTime.setDate(
            adjustedStartTime.getDate() +
              ((dayOffset - courseStartTime.getDay() + 7) % 7)
          );

          const adjustedEndTime = new Date(adjustedStartTime);
          adjustedEndTime.setHours(
            courseEndTime.getHours(),
            courseEndTime.getMinutes()
          );

          calendar.createEvent({
            start: adjustedStartTime,
            end: adjustedEndTime,
            summary: `${course.department} ${course.number} - ${schedulePart.sectionCode}`,
            location: schedulePart.campus,
            description: `Course Section: ${course.section}`,
            repeating: {
              freq: ICalEventRepeatingFreq.WEEKLY,
              until: endDate,
            },
          });
        });
      });
    });

    const calendarBlob = new Blob([calendar.toString()], {
      type: "text/calendar",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(calendarBlob);
    link.download = "course_schedule.ics";
    link.click();
  };

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
        onClick={downloadCalendarFile}
      >
        Download Calendar File
      </Button>

      <Divider className="w-full" />

      <Title size="h2" className="text-center">
        How To Import The Downloaded File To A Calendar
      </Title>

      <Text>Steps for some select calendar services are below.</Text>

      <ImportTutorial />
    </div>
  );
}
