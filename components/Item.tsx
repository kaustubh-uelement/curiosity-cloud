import React from "react";
import { ICONS, Grid } from "./Icons";
import { IconKey } from "@/lib/types";

interface ItemProps {
  n: number;
  title: string;
  body: string;
  icon: IconKey;
}

export const Item = ({ n, title, body, icon }: ItemProps) => {
  const I = ICONS[icon] || Grid;
  return (
    <article className="item">
      <div className="num">{String(n).padStart(2, "0")}</div>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="ico"><I /></div>
    </article>
  );
};
