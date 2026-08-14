import React from "react";

interface SpecProps {
  rows: [string, string][];
  style?: React.CSSProperties;
}

export const Spec = ({ rows, style }: SpecProps) => (
  <table className="spec" style={style}>
    <tbody>
      {rows.map(([k, v], i) => (
        <tr key={i}>
          <th>{k}</th>
          <td>{v}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
