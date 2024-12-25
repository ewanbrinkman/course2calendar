// "use client";

// import { useEffect, useState } from "react";
// import BaseAutocomplete from "./BaseAutocomplete";
// import courseApiWrapper from "course-api-wrapper";

// interface CourseAutocompleteProps {
//   onCourseSelect: (course: string | null) => void;
//   department: string | null;
// }

// export default function CourseAutocomplete({
//   department,
//   onCourseSelect,
// }: CourseAutocompleteProps) {
//   const [courses, setCourses] = useState<null | string[]>([]);

//   // Fetch courses on department update.
//   useEffect(() => {
//     const fetchCourses = async () => {
//       if (department === null) {
//         setCourses(null);

//         return;
//       }

//       try {
//         const data = await courseApiWrapper.departmentCourseNumbers(department);
//         setCourses(data);
//       } catch (err) {
//         console.error("Failed to fetch courses:", err);
//         setCourses(null);
//       }
//     };

//     fetchCourses();
//   }, [department]);

//   const isValid = (value: string) => {
//     return courses?.includes(value.toUpperCase()) || false;
//   };

//   const onSelect = (value: string | null) => {
//     onCourseSelect(value?.toUpperCase() ?? null);
//   };

//   return (
//     <BaseAutocomplete
//       label="Select Course"
//       placeholder="Start typing a course ID"
//       data={courses}
//       onSelect={onSelect}
//       isValid={isValid}
//       disabled={courses === null}
//     />
//   );
// }
