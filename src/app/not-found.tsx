"use client";
import React from "react";
import { Button, Title } from "@mantine/core";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8">
      <Title size="h1">Page Not Found</Title>
      <Button onClick={() => {}}>Home</Button>
    </div>
  );
};

export default NotFoundPage;
