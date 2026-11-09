"use client";

import { useEffect, useRef } from "react";
import "./Research.css";

/* ------------------------------------------------------------------ */
/*  Content — copy from the updated design's ( 04 ) RESEARCH screen    */
/* ------------------------------------------------------------------ */

const CARDS = [
  {
    tag: "Academic",
    title: "Evidence over hype",
    desc: "Frameworks grounded in current research on how AI is reshaping buyer behaviour and marketing.",
    hi: false,
    icon: (
      /* beaker / lab flask */
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9.5 3h5M10.5 3v5.1a1.5 1.5 0 0 1-.16.67L6.1 16.9A2.2 2.2 0 0 0 8.06 20h7.88a2.2 2.2 0 0 0 1.96-3.1l-4.24-8.13a1.5 1.5 0 0 1-.16-.67V3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.6 14.5h8.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    tag: "Applied",
    title: "AI that earns its place",
    desc: "Practical AI workflows for content and campaigns — used where they help, skipped where they don't.",
    hi: true,
    icon: (
      /* four-point sparkle wand */
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14.5 3.5c.55 3.6 2.3 5.35 5.9 5.9-3.6.55-5.35 2.3-5.9 5.9-.55-3.6-2.3-5.35-5.9-5.9 3.6-.55 5.35-2.3 5.9-5.9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7 14.5c.3 2 1.25 2.95 3.25 3.25-2 .3-2.95 1.25-3.25 3.25-.3-2-1.25-2.95-3.25-3.25 2-.3 2.95-1.25 3.25-3.25Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Research — dark lab panel with a glowing circle that smoothly      */
/*  follows the cursor while it moves around the section.              */
/* ------------------------------------------------------------------ */

export default function Research() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  /* Scroll-reveal: .mk-rs-reveal gets .mk-rs-in when entering viewport */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-rs-reveal").forEach((el) => el.classList.add("mk-rs-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-rs-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-rs-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Cursor glow: the halo eases towards the pointer with a rAF lerp,
     so it "drags" behind the mouse instead of snapping to it. */
  useEffect(() => {
    const section = sectionRef.current;
    const halo = cursorRef.current;
    if (!section || !halo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      /* lower factor = heavier, smoother drag */
      curX += (targetX - curX) * 0.11;
      curY += (targetY - curY) * 0.11;
      halo.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`;
      /* keep easing until we are basically on top of the pointer */
      if (Math.abs(targetX - curX) > 0.3 || Math.abs(targetY - curY) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      targetX = e.clientX - r.left;
      targetY = e.clientY - r.top;
      if (!halo.classList.contains("mk-rs-cursor-on")) {
        /* first appearance: start exactly under the pointer, no fly-in */
        curX = targetX;
        curY = targetY;
        halo.classList.add("mk-rs-cursor-on");
      }
      wake();
    };

    const onLeave = () => halo.classList.remove("mk-rs-cursor-on");

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mk-research" id="research">
      {/* ---------- glowing cursor companion ---------- */}
      <div className="mk-rs-cursor" ref={cursorRef} aria-hidden="true">
        <span className="mk-rs-halo" />
        <span className="mk-rs-ring" />
        <span className="mk-rs-core" />
      </div>

      {/* ---------- dark lab panel ---------- */}
      <div className="mk-rs-panel">
        <div className="mk-rs-grid-bg" aria-hidden="true" />
        <div className="mk-rs-vignette" aria-hidden="true" />

        <div className="mk-rs-inner">
          {/* ---------- left: statement ---------- */}
          <div className="mk-rs-copy">
            <p className="mk-rs-eyebrow mk-rs-reveal">( 04 ) — Research</p>
            <h2 className="mk-rs-title mk-rs-reveal" style={{ transitionDelay: "80ms" }}>
              Where the lab
              <br />
              meets the <em>launch.</em>
            </h2>
            <p className="mk-rs-body mk-rs-reveal" style={{ transitionDelay: "160ms" }}>
              Fun fact, I&rsquo;m also pursuing a PhD focused on AI in
              marketing. That means your strategy is informed by what the
              research actually says, not just what&rsquo;s trending on
              LinkedIn this week.
            </p>
            {/* <a
              className="mk-rs-link mk-rs-reveal"
              href="#contact"
              style={{ transitionDelay: "240ms" }}
            >
              Ask me about AI in your marketing
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a> */}
          </div>

          {/* ---------- right: evidence cards ---------- */}
          <div className="mk-rs-cards">
            {CARDS.map((c, i) => (
              <article
                key={c.title}
                className={`mk-rs-card mk-rs-reveal${c.hi ? " mk-rs-card-hi" : ""}`}
                style={{ transitionDelay: `${140 + i * 130}ms` }}
              >
                <div className="mk-rs-card-top">
                  <span className="mk-rs-icon ">{c.icon}</span>
                  <span className="mk-rs-chip">{c.tag}</span>
                </div>
                <h3 className="mk-rs-card-title">{c.title}</h3>
                <p className="mk-rs-card-desc">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
