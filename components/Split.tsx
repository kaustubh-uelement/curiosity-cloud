import React from "react";

interface SplitProps {
  left: React.ReactNode;
  children: React.ReactNode;
}

export const Split = ({ left, children }: SplitProps) => (
  <div className="split">
    <div>{left}</div>
    <div>{children}</div>
  </div>
);
