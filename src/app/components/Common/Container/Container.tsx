import React from "react";

import { CSSProperties } from "react";

interface ContainerProps {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return (
    <div
      className={`bg-secondary-color rounded-lg flex flex-col items-center text-primary-color p-4 text-center space-y-4 ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
