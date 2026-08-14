"use client";

import React, { useState } from "react";
import { Eyebrow } from "./Eyebrow";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    need: "Reserved GPU cluster",
    size: "",
    when: "",
    detail: ""
  });
  const [sent, setSent] = useState(false);

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const ready = Boolean(form.name.trim() && form.email.trim());

  return (
    <div>
      <Eyebrow>Capacity request</Eyebrow>
      {sent ? (
        <div className="sent" style={{ display: "block" }}>
          Request received. Someone from the capacity team replies within one business day.
        </div>
      ) : (
        <div className="form" style={{ marginTop: 26 }}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={form.name} onChange={set("name")} />
          </div>
          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" type="email" value={form.email} onChange={set("email")} />
          </div>
          <div className="field">
            <label htmlFor="company">Organisation</label>
            <input id="company" value={form.company} onChange={set("company")} />
          </div>
          <div className="field">
            <label htmlFor="need">What you need</label>
            <select id="need" value={form.need} onChange={set("need")}>
              <option>Reserved GPU cluster</option>
              <option>On-demand capacity</option>
              <option>Managed inference</option>
              <option>Colocation or managed racks</option>
              <option>Power / offtake conversation</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="size">Approximate size</label>
            <input
              id="size"
              placeholder="e.g. 64 nodes, or 3 MW"
              value={form.size}
              onChange={set("size")}
            />
          </div>
          <div className="field">
            <label htmlFor="when">Needed by</label>
            <input
              id="when"
              placeholder="e.g. Q1 2027"
              value={form.when}
              onChange={set("when")}
            />
          </div>
          <div className="field full">
            <label htmlFor="detail">Workload</label>
            <textarea
              id="detail"
              placeholder="Training or inference, framework, storage and networking needs, residency or compliance constraints."
              value={form.detail}
              onChange={set("detail")}
            />
          </div>
          <div className="field full">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!ready}
              onClick={() => setSent(true)}
            >
              Send request <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
      <p className="form-note">This does not go into a nurture sequence. A human reads it.</p>
    </div>
  );
}
