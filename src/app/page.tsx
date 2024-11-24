import { Autocomplete } from "@mantine/core";

export default function Home() {
  return (
    <Autocomplete
      label="Courses"
      placeholder="Enter a course"
      data={["CMPT 120 D100", "CMPT 125 D100", "MACM 101 D100"]}
    />
  );
}
