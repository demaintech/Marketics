"use client";

import { useEffect, useRef, useState } from "react";
import "./Services.css";

/* ------------------------------------------------------------------ */
/*  Content — the six services, named exactly as on the original       */
/*  marketics.biz site. Taglines / descriptions / tags written to      */
/*  match the accordion layout of the updated design.                  */
/* ------------------------------------------------------------------ */

type Service = {
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    title: "Branding",
    tagline: "Identity people remember",
    desc: "Strategy-first branding for founders who want more than a pretty logo — positioning, personality and a visual identity that make your company impossible to confuse with anyone else.",
    tags: ["Brand strategy", "Visual identity", "Brand voice", "Guidelines"],
  },
  {
    title: "Marketing Strategy",
    tagline: "A plan that actually gets used",
    desc: "A clear, prioritised plan built around your goals and budget — what to do, what to skip, and in what order. No forty-page decks gathering dust in a drive somewhere.",
    tags: ["Go-to-market", "Funnel planning", "Channel mix", "KPI frameworks"],
  },
  {
    title: "Content & Social",
    tagline: "A system, not a scramble",
    desc: "Content strategy and production that compounds — thought leadership, founder-led content and assets that support every stage of the funnel.",
    tags: ["Founder-led LinkedIn", "SEO articles", "Case studies", "Newsletters"],
  },
  {
    title: "Campaigns",
    tagline: "Launches that move the needle",
    desc: "Launches and always-on campaigns that connect the dots across channels — built to create momentum and pipeline, not just impressions.",
    tags: ["Product launches", "Email sequences", "Paid + organic", "Landing pages"],
  },
  {
    title: "1:1 Consulting",
    tagline: "Your on-call marketing brain",
    desc: "Senior marketing guidance without the full-time hire — strategy sessions, audits and honest answers to the questions that keep you stuck.",
    tags: ["Strategy sessions", "Marketing audits", "Founder coaching", "Office hours"],
  },
  {
    title: "Speaking",
    tagline: "Stages, workshops & masterclasses",
    desc: "Talks and workshops that make marketing make sense — keynotes, panels and masterclasses on branding, AI in marketing and building a brand in public.",
    tags: ["Keynotes", "Workshops", "Panels", "Guest lectures"],
  },
];

/* ------------------------------------------------------------------ */
/*  Services — accordion (adapted from the updated design, purple)     */
/* ------------------------------------------------------------------ */

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number>(0);

  /* Scroll-reveal: .mk-sv-reveal gets .mk-sv-in when entering viewport */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-sv-reveal").forEach((el) => el.classList.add("mk-sv-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-sv-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-sv-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mk-services" id="services">
      {/* ---------- ambient background ---------- */}
      <div className="mk-sv-fx" aria-hidden="true">
        <div className="mk-sv-glow mk-sv-glow-a" />
        <div className="mk-sv-glow mk-sv-glow-b" />
        <div className="mk-sv-line" />
      </div>

      <div className="mk-sv-inner">
        {/* ---------- header ---------- */}
        <header className="mk-sv-head mk-sv-reveal">
          <p className="mk-sv-eyebrow">( 02 ) — Services</p>
          <div className="mk-sv-head-row">
            <h2 className="mk-sv-title">
              From fuzzy to <em>focused.</em>
            </h2>
            <p className="mk-sv-sub">
              Six connected services. Start where you&rsquo;re stuck — each one
              builds on the last so your marketing finally pulls in one
              direction.
            </p>
          </div>
        </header>

        {/* ---------- accordion ---------- */}
        <div className="mk-sv-list mk-sv-reveal" style={{ transitionDelay: "120ms" }}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <article
                key={s.title}
                className={`mk-sv-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="mk-sv-row"
                  aria-expanded={isOpen}
                  aria-controls={`mk-sv-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="mk-sv-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mk-sv-name">{s.title}</span>
                  <span className="mk-sv-tagline">{s.tagline}</span>
                  <span className="mk-sv-toggle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2.6v10.8M2.6 8h10.8"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className="mk-sv-body"
                  id={`mk-sv-panel-${i}`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="mk-sv-body-in">
                    <div className="mk-sv-body-grid">
                      <p className="mk-sv-desc">{s.desc}</p>
                      <ul className="mk-sv-tags">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
