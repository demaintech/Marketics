"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./Engagements.css";

/* ------------------------------------------------------------------ */
/*  Content — the three engagement formats                             */
/* ------------------------------------------------------------------ */

const ENGAGEMENTS = [
  {
    num: "01",
    title: "Positioning Sprint",
    dur: "2–4 weeks",
    img: "/images/eng-1.jpg",
    alt: "Positioning workshop wall covered in framework sticky notes",
    desc: "For early-stage teams who need a clear story before they scale.",
  },
  {
    num: "02",
    title: "Launch Campaign",
    dur: "6–10 weeks",
    img: "/images/eng-2.jpg",
    alt: "Team presenting a launch campaign to the room",
    desc: "Go-to-market for a new product, feature or funding moment.",
  },
  {
    num: "03",
    title: "Fractional Partner",
    dur: "Monthly",
    img: "/images/eng-3.jpg",
    alt: "Working session with a founder over a laptop",
    desc: "Ongoing marketing lead for growing brands without a full team.",
  },
];

/* ------------------------------------------------------------------ */
/*  Engagements — "How founders work with me"                          */
/* ------------------------------------------------------------------ */

export default function Engagements() {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Scroll-reveal: .mk-en-reveal gets .mk-en-in when entering viewport */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-en-reveal").forEach((el) => el.classList.add("mk-en-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-en-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-en-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mk-engagements" id="engagements">
      {/* ---------- ambient background ---------- */}
      <div className="mk-en-fx" aria-hidden="true">
        <div className="mk-en-glow mk-en-glow-a" />
        <div className="mk-en-glow mk-en-glow-b" />
      </div>

      <div className="mk-en-inner">
        {/* ---------- header ---------- */}
        <header className="mk-en-head mk-en-reveal">
          <div>
            <p className="mk-en-eyebrow">( 05 ) — Engagements</p>
            <h2 className="mk-en-title">
              How founders <em>work with me.</em>
            </h2>
          </div>
          <a className="mk-en-fit" href="#contact">
            Find your fit
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </header>

        {/* ---------- cards ---------- */}
        <div className="mk-en-grid">
          {ENGAGEMENTS.map((g, i) => (
            <article
              key={g.title}
              className="mk-en-card mk-en-reveal"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="mk-en-media">
                <Image
                  src={g.img}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  className="mk-en-img"
                />
                <span className="mk-en-dur">{g.dur}</span>
                <span className="mk-en-shade" aria-hidden="true" />
              </div>

              <div className="mk-en-body">
                <div className="mk-en-row">
                  <h3 className="mk-en-card-title">{g.title}</h3>
                  <span className="mk-en-num">{g.num}</span>
                </div>
                <p className="mk-en-desc">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
