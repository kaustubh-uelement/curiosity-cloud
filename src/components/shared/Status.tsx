export function Status({ s }: { s: string }) {
  return (
    <span
      className={`status ${
        s === "Placeholder" || s === "Design target"
          ? "status-open"
          : "status-set"
      }`}
    >
      {s}
    </span>
  );
}
