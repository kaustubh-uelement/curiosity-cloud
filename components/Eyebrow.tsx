import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  dark?: boolean;
}

export const Eyebrow = ({ children, dark }: EyebrowProps) => (
  <p className={dark ? "eyebrow on-dark" : "eyebrow"}>{children}</p>
);
