"use client";
import React from "react";
import { Title } from "@mantine/core";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8">
      <Title size="h1">Loading...</Title>
    </div>
  );
};

export default LoadingPage;
