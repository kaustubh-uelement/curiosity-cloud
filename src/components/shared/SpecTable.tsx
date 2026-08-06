import { Status } from "./Status";
import type { Spec } from "@/lib/content/types";

interface SpecTableProps {
  rows: Spec[];
  caption?: string;
}

export function SpecTable({ rows, caption }: SpecTableProps) {
  return (
    <div className="instrument-shell glass">
      <table className="instrument">
        <caption className="sr-only">{caption || "Specification"}</caption>

        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Value</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([parameter, value, status], index) => (
            <tr key={`${parameter}-${index}`}>
              <th scope="row">{parameter}</th>
              <td>{value}</td>
              <td>
                <Status s={status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
