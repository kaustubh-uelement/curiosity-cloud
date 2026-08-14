import React from "react";
import Link from "next/link";
import { Rule } from "@/components/Rule";
import { Eyebrow } from "@/components/Eyebrow";
import { LogoRow } from "@/components/LogoRow";
import { Item } from "@/components/Item";
import { Card } from "@/components/Card";
import { Split } from "@/components/Split";
import { Spec } from "@/components/Spec";
import { Terrain } from "@/components/Terrain";
import { DocIcon } from "@/components/Icons";
import { CTA } from "@/components/CTA";
import { PROBLEMS, PRODUCTS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section>
        <div className="frame hero">
          <div className="hero-copy">
            <h1>
              AI is <span className="b">power</span> before it is <span className="b2">compute.</span>
            </h1>
            <p className="lede">
              Curiosity builds the energy, the data centres and the cloud as one system, so capacity lands on your timeline, not the grid&apos;s.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">
                Request capacity <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/docs">
                View docs <DocIcon />
              </Link>
            </div>
          </div>
          <div className="terrain-wrap">
            <Terrain variant="hero" />
          </div>
        </div>
      </section>

      <Rule />
      <section className="white-band">
        <div className="logos-in">
          <Eyebrow>Built with model teams, enterprises and research institutions</Eyebrow>
          <LogoRow />
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The problem</Eyebrow>
          <Split
            left={
              <>
                <h2>Chips Are Not The Bottleneck Anymore</h2>
                <p className="note">
                  Accelerators ship in months. Power, land and interconnection take years, and they decide when a cluster actually turns on.
                </p>
              </>
            }
          >
            {PROBLEMS.map(([t, b, i], n) => (
              <Item key={t} n={n + 1} title={t} body={b} icon={i} />
            ))}
          </Split>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The thesis</Eyebrow>
          <h2>Current To Chip To Cloud, Under One Roof</h2>
          <p className="note" style={{ maxWidth: 520, marginTop: 26 }}>
            Most providers rent one layer of this and buy the rest. We hold all three, which is why we can commit to a date, and to what the power behind it costs.
          </p>
          <div className="flow">
            <div className="flow-step">
              <span className="k">01 · Current</span>
              <h3>Contracted electrons</h3>
              <p>Captive and group-captive renewables, storage and firm supply arranged around the site before a rack is ordered.</p>
              <span className="arrow">↓</span>
            </div>
            <div className="flow-step">
              <span className="k">02 · Chip</span>
              <h3>Dense halls</h3>
              <p>Direct-to-chip liquid cooling, high-density racks, and a build sequence that follows the energisation schedule.</p>
              <span className="arrow">↓</span>
            </div>
            <div className="flow-step">
              <span className="k">03 · Cloud</span>
              <h3>Usable capacity</h3>
              <p>Clusters, endpoints and quotas provisioned in minutes, with energy attribution carried all the way to the job.</p>
              <span className="arrow">✓</span>
            </div>
          </div>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>The platform</Eyebrow>
          <Split
            left={
              <>
                <h2>Four Products, One Control Plane</h2>
                <p className="note">
                  Energy, sites, clusters and endpoints share a single management plane, so a quota change, a rack build and a power schedule are the same conversation.
                </p>
              </>
            }
          >
            <div className="cards two" style={{ marginTop: 0 }}>
              {PRODUCTS.map((p) => (
                <Card
                  key={p.slug}
                  k={p.key}
                  title={p.name}
                  body={p.blurb}
                  href={`/platform/${p.slug}`}
                />
              ))}
            </div>
          </Split>
        </div>
      </section>

      <Rule />
      <section>
        <div className="frame section">
          <Eyebrow>Getting started</Eyebrow>
          <Split
            left={
              <>
                <h2>A Cluster In One Command</h2>
                <p className="note">
                  Reserved capacity shows up as a pool in your account. Carve clusters out of it, hand them to Slurm or Kubernetes, and read back what each job cost in rupees and in kilowatt-hours.
                </p>
                <p className="note">
                  <Link className="golink" href="/docs">
                    Read the quickstart →
                  </Link>
                </p>
              </>
            }
          >
            <pre>
              <code>
                {`# reserved pool -> running cluster
curiosity clusters create \\
  --region in-mh-1 \\
  --accelerator h200 --nodes 64 \\
  --fabric ib-400g \\
  --power-profile 24x7-cfe

# what did that run actually consume?
curiosity usage energy --job train-7b-0812`}
              </code>
            </pre>
            <Spec
              rows={[
                ["Orchestration", "Managed Slurm, managed Kubernetes, or bare metal with your own scheduler"],
                ["Fabric", "Non-blocking 400G InfiniBand within a hall, rail-optimised for collectives"],
                ["Storage", "Parallel NVMe scratch, object storage, and dataset caching close to the fabric"],
                ["Attribution", "Per-job kWh, carbon-free share and cost, exposed through the usage API"]
              ]}
            />
          </Split>
        </div>
      </section>

      <Rule />
      <section className="white-band">
        <div className="logos-in">
          <Eyebrow>Why India, why now</Eyebrow>
          <div className="cards" style={{ marginTop: 34 }}>
            <div className="card stat">
              <span className="k">Peak demand</span>
              <h3>257 GW</h3>
              <p>Crossed in 2026, heading towards roughly 425 GW by 2035. AI load arrives on top of that curve, not instead of it.</p>
            </div>
            <div className="card stat">
              <span className="k">Clean build-out</span>
              <h3>50 GW+</h3>
              <p>Annual clean capacity now being added: the raw material for behind-the-meter AI supply.</p>
            </div>
            <div className="card stat">
              <span className="k">Ten-year need</span>
              <h3>1.5 TW</h3>
              <p>Clean generation required over the next ten to twelve years. Whoever contracts it early builds the cheapest compute.</p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
