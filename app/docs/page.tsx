import React from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Rule } from "@/components/Rule";
import { Spec } from "@/components/Spec";
import { CTA } from "@/components/CTA";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DOC_NAV } from "@/lib/data";

export const metadata = {
  title: "Documentation — Curiosity Cloud",
  description: "From account to first job in about fifteen minutes."
};

export default function DocsPage() {
  return (
    <>
      <section>
        <div className="frame page-head" style={{ paddingBottom: 30 }}>
          <Eyebrow>Documentation</Eyebrow>
          <h1 style={{ marginTop: 26, fontSize: "clamp(34px,4.6vw,56px)" }}>
            From account to first job in about fifteen minutes.
          </h1>
          <p className="lede">
            Install the CLI, launch a cluster out of your pool, run a job, and read back what it consumed.
          </p>
        </div>
      </section>
      <Rule />
      <section>
        <div className="frame">
          <div className="docs">
            <DocsSidebar nav={DOC_NAV} />
            <div className="docs-body prose">
              <h2 id="quickstart" style={{ marginTop: 0 }}>
                Quickstart
              </h2>
              <p>
                You need an API key from <strong>Console → Keys</strong> and either an active reservation or an on-demand entitlement.
              </p>
              <pre>
                <code>
                  {`curl -fsSL https://get.curiosity.cloud | sh
curiosity auth login --key "ck_live_..."
curiosity pools list`}
                </code>
              </pre>

              <h2 id="concepts">Core concepts</h2>
              <Spec
                rows={[
                  ["Pool", "Capacity you hold — reserved for a term, or drawn on demand."],
                  ["Cluster", "Nodes carved out of a pool, with a fabric, an image and a scheduler."],
                  ["Region", "A site with its own power profile, fabric domain and storage."],
                  ["Power profile", "The supply arrangement behind a workload, e.g. 24x7-cfe or grid-firm."],
                  ["Attribution", "Energy, carbon-free share and cost, resolved down to a job id."]
                ]}
              />

              <h2 id="clusters">Launch a cluster</h2>
              <pre>
                <code>
                  {`curiosity clusters create \\
  --region in-mh-1 \\
  --accelerator h200 --nodes 64 \\
  --fabric ib-400g \\
  --scheduler slurm \\
  --power-profile 24x7-cfe

curiosity clusters ssh my-cluster
srun --nodes=64 --gpus-per-node=8 train.sh`}
                </code>
              </pre>
              <p>Clusters keep their identity across restarts, so checkpoints, mounts and host keys survive a drain.</p>

              <h2 id="storage">Storage and data</h2>
              <Spec
                rows={[
                  ["Scratch", "Parallel NVMe attached to the fabric; sized per cluster, wiped on teardown."],
                  ["Object", "S3-compatible, region-local, versioned, with lifecycle rules."],
                  ["Cache", "Dataset cache close to the accelerators for repeated epochs."],
                  ["Transfer", "Private link, direct connect, or physical seeding for first loads."]
                ]}
              />

              <h2 id="inference">Serve a model</h2>
              <pre>
                <code>
                  {`curiosity endpoints create \\
  --model catalogue/open-70b-instruct \\
  --region in-mh-1 --min-replicas 1 --max-replicas 12

curl https://api.curiosity.cloud/v1/chat/completions \\
  -H "Authorization: Bearer $CURIOSITY_API_KEY" \\
  -d '{"model":"open-70b-instruct","messages":[...]}' `}
                </code>
              </pre>
              <p>The endpoint is OpenAI-compatible, so most SDKs work by changing the base URL.</p>

              <h2 id="energy">Energy attribution</h2>
              <pre>
                <code>
                  {`curiosity usage energy --job train-7b-0812 --format json

{
  "job": "train-7b-0812",
  "kwh": 41820.6,
  "carbon_free_pct": 82.4,
  "region": "in-mh-1",
  "power_profile": "24x7-cfe"
}`}
                </code>
              </pre>
              <p>
                Hourly matched percentages come from metered generation, storage discharge and grid import at the site. Modelled values are flagged in the response.
              </p>

              <h2 id="regions">Regions</h2>
              <Spec
                rows={[
                  ["in-mh-1", "Maharashtra · liquid-cooled · IB 400G · general availability"],
                  ["in-mh-2", "Maharashtra · expansion hall · accepting reservations"],
                  ["in-gj-1", "Gujarat · renewable-adjacent · in build"]
                ]}
              />

              <h2 id="api">API</h2>
              <Spec
                rows={[
                  ["GET /v1/pools", "Reservations, entitlements and remaining capacity."],
                  ["POST /v1/clusters", "Create a cluster from a pool. Returns a cluster id."],
                  ["GET /v1/clusters/:id", "State, node health, fabric topology, scheduler endpoint."],
                  ["POST /v1/endpoints", "Create or update an inference endpoint."],
                  ["GET /v1/usage/energy", "kWh, carbon-free share and cost by job, cluster or project."]
                ]}
              />
              <p>Bearer auth, cursor pagination, 600 requests per minute per key.</p>

              <h2 id="changelog">Changelog</h2>
              <ul>
                <li>
                  <strong>2026.08</strong> — Per-job energy attribution in the usage API; <code>in-mh-2</code> open for reservations.
                </li>
                <li>
                  <strong>2026.07</strong> — Managed Kubernetes on reserved pools; dataset cache at the fabric edge.
                </li>
                <li>
                  <strong>2026.06</strong> — Bring-your-own-weights endpoints; private link into customer VPCs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
