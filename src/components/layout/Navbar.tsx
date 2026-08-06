"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_PRODUCTS, NAV_PLATFORM } from "@/lib/content/navigation";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const route = pathname.replace(/^\//, "").replace(/\/$/, "");
  const on = (s: string) => (route === s ? " is-active" : "");

  return (
    <header className="nav glass">
      <Link className="" href="/">
        <Image
          src="/curiosity-cloud-full.png"
          alt="Curiosity Cloud"
          width={180}
          height={40}
          priority
        />
      </Link>

      <nav className="nav-main" aria-label="Primary">
        <div className="menu">
          <Link
            className={`menu-top${route.startsWith("products") ? " is-active" : ""}`}
            href="/products"
          >
            Products
          </Link>
          <div className="menu-panel glass">
            {NAV_PRODUCTS.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="menu">
          <Link
            className={`menu-top${route.startsWith("platform") ? " is-active" : ""}`}
            href="/platform/energy"
          >
            Platform
          </Link>
          <div className="menu-panel glass">
            {NAV_PLATFORM.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
        <Link className={`menu-top${on("why")}`} href="/why">
          Why Curiosity
        </Link>
        <Link
          className={`menu-top${on("specification")}`}
          href="/specification"
        >
          Specification
        </Link>
        <Link className={`menu-top${on("company")}`} href="/company">
          Company
        </Link>
        <Link className={`menu-top${on("roadmap")}`} href="/roadmap">
          Roadmap
        </Link>
      </nav>

      <div className="nav-actions">
        <Link className="nav-link" href="/contact">
          Contact sales
        </Link>
        <Link className="btn btn-primary nav-cta" href="/contact">
          Request capacity
        </Link>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <p className="mm-head mono">Products</p>
          {NAV_PRODUCTS.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`}>
              {item.name}
            </Link>
          ))}
          <p className="mm-head mono">Platform</p>
          {NAV_PLATFORM.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`}>
              {item.name}
            </Link>
          ))}
          <p className="mm-head mono">Company</p>
          <Link href="/why">Why Curiosity</Link>
          <Link href="/specification">Specification</Link>
          <Link href="/company">Company</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </header>
  );
}
