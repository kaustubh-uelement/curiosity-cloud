import React from "react";
import Link from "next/link";

export const metadata = {
  title: "404 Not Found — Curiosity Cloud",
  description: "This route has no power."
};

export default function NotFound() {
  return (
    <section>
      <div className="frame err">
        <p className="code">HTTP 404 · NOT FOUND</p>
        <h1 style={{ marginTop: 24, fontSize: "clamp(40px,6vw,86px)" }}>
          This route has <span className="b">no power.</span>
        </h1>
        <p className="lede">
          Nothing is energised at this address. Try the platform, the docs, or start from home.
        </p>
        <div className="hero-actions" style={{ marginTop: 30 }}>
          <Link className="btn btn-primary" href="/">
            Back to home <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn-ghost" href="/docs">
            View docs
          </Link>
        </div>
      </div>
    </section>
  );
}
