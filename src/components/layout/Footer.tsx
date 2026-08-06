import Link from "next/link";
import { BODIES } from "@/lib/content/bodies";
import { NAV_PLATFORM } from "@/lib/content/navigation";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="foot">
      <div className="inner foot-grid">
        <div className="foot-brand-col">
          <div className="foot-brand">
            <Image
              src="/curiosity-cloud-full.png"
              alt="Curiosity Cloud"
              width={180}
              height={40}
              priority
            />
          </div>
          <p className="foot-note">
            Part of Curiosity — Energy, AI and Cloud. The infrastructure layer
            for India&apos;s AI economy.
          </p>
        </div>
        <div className="foot-col">
          <h4>Products</h4>
          <ul>
            {BODIES.map((b) => (
              <li key={b.id}>
                <Link href={`/${b.slug}`}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="foot-col">
          <h4>Platform</h4>
          <ul>
            {NAV_PLATFORM.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`}>{item.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/specification">Specification</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/company">About</Link>
            </li>
            <li>
              <Link href="/why">Why Curiosity</Link>
            </li>
            <li>
              <Link href="/roadmap">Roadmap</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="inner foot-base">
        <p className="mono">© 2026 Curiosity Cloud</p>
        <p className="mono foot-fine">
          Values marked <span className="status status-open">Placeholder</span>{" "}
          or <span className="status status-open">Design target</span> are
          illustrative and pending confirmation.
        </p>
      </div>
    </footer>
  );
}
