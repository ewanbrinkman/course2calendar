import { Text, Divider, Anchor, Code } from "@mantine/core";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center p-8 space-y-8 text-center">
      <Text className="text-4xl">Info</Text>
      <Text>Easily add your courses to your calendar!</Text>
      <Text>Made by Ewan Brinkman.</Text>

      <Divider className="w-full" />

      <Text className="text-4xl">Source Code</Text>
      <Text>
        Source code is on GitHub{" "}
        <Anchor href="https://github.com/ewanbrinkman/course2calendar">
          here
        </Anchor>{" "}
        (MIT license) {":)"}
      </Text>
      <Text>
        Feel free to contribute or open an issue{" "}
        <Anchor href="https://github.com/ewanbrinkman/course2calendar/issues">
          here
        </Anchor>
        !
      </Text>

      <Divider className="w-full" />

      <Text className="text-4xl">Getting Course Data</Text>
      <Text>
        I made an npm package that acts as a wrapper for the course API. You can
        install it with <Code>npm install course-api-wrapper</Code>. Both of the
        links below show usage examples.
      </Text>
      <Text>
        The package can be found on GitHub{" "}
        <Anchor href="https://github.com/ewanbrinkman/sfu-course-api-wrapper">
          here
        </Anchor>
        .
      </Text>
      <Text>
        The package can be found on the npm website{" "}
        <Anchor href="https://www.npmjs.com/package/course-api-wrapper">
          here
        </Anchor>
        .
      </Text>

      <Divider className="w-full" />

      <Text>Obligatory "The Cure" Plug:</Text>
      <iframe
        className="rounded-xl w-72 sm:w-96"
        src="https://open.spotify.com/embed/artist/7bu3H8JO7d0UbMoVzbo70s?utm_source=generator"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
