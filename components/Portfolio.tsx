"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

/* ------------------------------------------------------------------ */
/*  Data — add / edit projects here. `url` is where the card links to  */
/*  (internal case-study route or external site — just swap it).       */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  cat: string;
  group: "web3" | "b2b" | "consumer";
  img: string;
  desc: string;
  stats: string[];
  url: string;
};

const PROJECTS: Project[] = [
  {
    title: "DragonSwap — DeFi Hub",
    cat: "Crypto · DeFi",
    group: "web3",
    img: "/images/work-dragonswap.jpg",
    desc: "From zero to Sei’s leading DeFi hub in seven months — a dragon-mythology brand narrative, an omni-channel content engine and community events that kept holders hooked.",
    stats: ["160K+ users", "$1.2B volume"],
    url: "/work/dragonswap",
  },
  {
    title: "Prepia — EdTech",
    cat: "SaaS · EdTech",
    group: "b2b",
    img: "/images/work-prepia.jpg",
    desc: "A marketing engine built for 5× growth — UGC pipeline, creator operations and a tight performance feedback loop, scaling the user base from ~100K to 500K+.",
    stats: ["5× user growth", "500K+ users"],
    url: "/work/prepia",
  },
  {
    title: "Gamblino — iGaming",
    cat: "Crypto · iGaming",
    group: "web3",
    img: "/images/work-gamblino.jpg",
    desc: "Brand identity and crypto-native content for a GambleFi protocol in the Sei ecosystem — mascot-led visuals, community campaigns and a voice players trust.",
    stats: ["GambleFi", "Sei ecosystem"],
    url: "/work/gamblino",
  },
  {
    title: "FindIT — Tech recruitment",
    cat: "B2B · SaaS",
    group: "b2b",
    img: "/images/work-findit.jpg",
    desc: "A full marketing rebuild that filled the sales pipeline — rebrand, new website, SEO content engine and a LinkedIn engine that finally pulled its weight.",
    stats: ["+30% inbound leads", "9 new clients"],
    url: "/work/findit",
  },
  {
    title: "Snipers.sale — Sales consulting",
    cat: "B2B · Services",
    group: "b2b",
    img: "/images/work-snipers.jpg",
    desc: "Swiss sales consulting brand built on the magician archetype — sharp positioning, content and outbound that turned attention into signed contracts.",
    stats: ["100+ qualified leads", "$40K training deals"],
    url: "/work/snipers-sale",
  },
  {
    title: "Dellgardo — Fashion · DTC",
    cat: "Consumer · DTC",
    group: "consumer",
    img: "/images/work-dellgardo.jpg",
    desc: "A premium fashion brand with a matching digital experience — website relaunch, social narrative, analytics and email systems that made the numbers move.",
    stats: ["+118% organic traffic", "+41% conversion", "+15% MRR"],
    url: "/work/dellgardo",
  },
];

const FILTERS = [
  { id: "all", label: "All work" },
  { id: "web3", label: "Crypto & Web3" },
  { id: "b2b", label: "B2B & SaaS" },
  { id: "consumer", label: "Consumer & DTC" },
] as const;

/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter);

  /* Scroll-reveal for the header + grid wrapper */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-pf-reveal").forEach((el) => el.classList.add("mk-pf-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-pf-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-pf-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
    /* re-run when the filter changes: the grid remounts (key={filter})
       and needs a fresh observer to get its .mk-pf-in class */
  }, [filter]);

  /* Cursor spotlight: track the pointer inside each card */
  const onSpot = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={sectionRef} className="mk-portfolio" id="portfolio">
      {/* ---------- ambient background ---------- */}
      <div className="mk-pf-fx" aria-hidden="true">
        <div className="mk-pf-grid-bg" />
        <div className="mk-pf-glow mk-pf-glow-a" />
        <div className="mk-pf-glow mk-pf-glow-b" />
      </div>

      <div className="mk-pf-inner">
        {/* ---------- header ---------- */}
        <div className="mk-pf-head mk-pf-reveal">
          <p className="mk-pf-eyebrow">( 03 ) — Portfolio</p>
          <h2 className="mk-pf-title">
            Selected work, <em>real numbers.</em>
          </h2>
          <p className="mk-pf-sub">
            Positioning, content engines and campaigns for tech, SaaS and DTC
            brands — every project built around a metric that matters. Hover a
            card for the story, click through for the full case study.
          </p>

          <div className="mk-pf-filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`mk-pf-pill${filter === f.id ? " is-active" : ""}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- cards ---------- */}
        <div className="mk-pf-grid mk-pf-reveal" key={filter}>
          {visible.map((p, i) => (
            <a
              key={p.title}
              href={p.url}
              className={`mk-pf-card ${(i % 4 === 0 || i % 4 === 3) ? "mk-pf-col-a" : "mk-pf-col-b"}`}
              style={{ "--i": i } as React.CSSProperties}
              onMouseMove={onSpot}
            >
              <Image
                src={p.img}
                alt={`${p.title} — ${p.cat}`}
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
              />

              <span className="mk-pf-cat">{p.cat}</span>
              <span className="mk-pf-idx">/ {String(i + 1).padStart(2, "0")}</span>
              <span className="mk-pf-veil" aria-hidden="true" />

              {/* resting bottom bar */}
              <span className="mk-pf-bar">
                <span className="mk-pf-name">{p.title}</span>
                <span className="mk-pf-go" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>

              {/* slide-up description panel */}
              <span className="mk-pf-hover">
                <span className="mk-pf-hover-title">{p.title}</span>
                <span className="mk-pf-desc">{p.desc}</span>
                <span className="mk-pf-chips">
                  {p.stats.map((s) => (
                    <i key={s}>{s}</i>
                  ))}
                </span>
                <span className="mk-pf-cta">
                  View case study
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
