import { Accordion, List } from "@mantine/core";

const tutorials = [
  {
    app: "Google Calendar (Website)",
    steps: [
      'Open "Settings"',
      'Click on "Import & export" (look at the left sidebar)',
      "Select the downloaded file",
      "Select the target calendar",
      'Click "Import"',
    ],
  },
  {
    app: "Outlook (Website)",
    steps: [
      "Drag and drop the downloaded file into the calendar",
      "Select the calendar to import into",
      'Click "Import"',
    ],
  },
];

export default function ImportTutorial() {
  const items = tutorials.map((tutorial) => (
    <Accordion.Item key={tutorial.app} value={tutorial.app}>
      <Accordion.Control>{tutorial.app}</Accordion.Control>
      <Accordion.Panel>
        <List type="ordered" className="list-decimal">
          {tutorial.steps.map((tutorialStep, index) => (
            <List.Item key={index}>{tutorialStep}</List.Item>
          ))}
        </List>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion variant="contained" className="w-96">
      {items}
    </Accordion>
  );
}
