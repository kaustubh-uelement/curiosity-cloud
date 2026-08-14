"use client";

import React, { useEffect } from "react";
import { DocNavGroup } from "@/lib/types";

interface DocsSidebarProps {
  nav: DocNavGroup[];
}

export function DocsSidebar({ nav }: DocsSidebarProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, []);

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <aside className="docs-nav">
      {nav.map(([group, links]) => (
        <div key={group}>
          <h4>{group}</h4>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}
