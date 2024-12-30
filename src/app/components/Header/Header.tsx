"use client";

import { usePathname } from "next/navigation";
import { Container, Group, Text } from "@mantine/core";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Text size="xl">Course 2 Calendar</Text>
        <Group gap={5}>{items}</Group>
      </Container>
    </header>
  );
}
