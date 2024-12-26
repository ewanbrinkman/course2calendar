import Container from "@components/Common/Container";
import CourseSelector from "@components/CourseSelector";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
      <p className="text-red">Hello</p>
      <Container className="w-full sm:max-w-4xl mx-16">
        <CourseSelector></CourseSelector>
      </Container>
    </div>
  );
}
