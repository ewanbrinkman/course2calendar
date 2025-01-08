import { CourseSection, Term } from "course-api-wrapper";
import { DateTime } from "luxon";
import ical, {
  ICalCalendarMethod,
  ICalEventRepeatingFreq,
} from "ical-generator";

const VANCOUVER_TIMEZONE = "America/Vancouver";

const dayMapping = {
  Mo: 1, // Monday
  Tu: 2, // Tuesday
  We: 3, // Wednesday
  Th: 4, // Thursday
  Fr: 5, // Friday
  Sa: 6, // Saturday
  Su: 7, // Sunday (Luxon treats Sunday as 7)
};

export default function downloadCalendarFile(
  selectedCourses: CourseSection[],
  year: number,
  term: Term
) {
  if (selectedCourses.length === 0) {
    return;
  }

  const calendar = ical({ name: "Course Schedule" });
  calendar.method(ICalCalendarMethod.PUBLISH);

  selectedCourses.forEach((course) => {
    course.schedule.forEach((schedulePart) => {
      schedulePart.days.forEach((day) => {
        // Parse the term's start and end dates in Vancouver timezone
        const termStart = DateTime.fromJSDate(
          new Date(schedulePart.startDate),
          { zone: VANCOUVER_TIMEZONE }
        );
        const termEnd = DateTime.fromJSDate(new Date(schedulePart.endDate), {
          zone: VANCOUVER_TIMEZONE,
        });

        // Find the first occurrence of the target day of the week
        const firstClassDate = termStart.plus({
          days: (dayMapping[day] - termStart.weekday + 7) % 7,
        });

        // Create start and end DateTime objects for the first class occurrence
        const start = firstClassDate.set({
          hour: parseInt(schedulePart.startTime.split(":")[0]),
          minute: parseInt(schedulePart.startTime.split(":")[1]),
        });

        const end = firstClassDate.set({
          hour: parseInt(schedulePart.endTime.split(":")[0]),
          minute: parseInt(schedulePart.endTime.split(":")[1]),
        });

        // Set `until` for the repeating event to include the term end date
        const until = termEnd.plus({ days: 1 });

        // Create the calendar event
        calendar.createEvent({
          timezone: VANCOUVER_TIMEZONE,
          start: start.toJSDate(), // Convert Luxon DateTime to native JS Date
          end: end.toJSDate(),
          summary: `${course.department} ${course.number} ${schedulePart.sectionCode}`,
          location: schedulePart.campus,
          description: "",
          repeating: {
            freq: ICalEventRepeatingFreq.WEEKLY,
            until: until.toJSDate(),
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
  link.download = `course_schedule_${term}_${year}.ics`;
  link.click();
}
