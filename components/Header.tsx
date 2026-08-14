"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark, Chev } from "./Icons";
import { PRODUCTS } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const pathname = usePathname();

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const active = (segment: string) => {
    if (!pathname) return undefined;
    const parts = pathname.split("/").filter(Boolean);
    return parts[0] === segment ? "active" : undefined;
  };

  return (
    <header className="site">
      <div className="head-in">
        <Link className="brand" href="/">
          <Mark /> Curiosity <span className="brand-tag">Cloud</span>
        </Link>
        <button
          className="burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
        </button>
        <nav className={open ? "main open" : "main"}>
          <div className="navitem">
            <Link href="/platform" className={active("platform")}>
              Platform <Chev />
            </Link>
            <div className="dropdown">
              {PRODUCTS.map((p) => (
                <Link key={p.slug} href={`/platform/${p.slug}`}>
                  {p.name}
                  <span className="d-k">{p.tagline}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/solutions" className={active("solutions")}>
            Solutions
          </Link>
          <Link href="/company" className={active("company")}>
            Company
          </Link>
          <Link href="/blog" className={active("blog")}>
            Blog
          </Link>
          <Link href="/docs" className={active("docs")}>
            Docs
          </Link>
        </nav>
        <Link className="btn btn-primary head-cta" href="/contact">
          Request capacity <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
