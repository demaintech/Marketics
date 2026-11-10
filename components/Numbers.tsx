"use client";

import { useEffect, useRef, useState } from "react";
import "./Numbers.css";

/* ------------------------------------------------------------------ */
/*  Content — numbers exactly as on the original marketics.biz site,   */
/*  plus the closing "Let's make marketing simpler" CTA.               */
/* ------------------------------------------------------------------ */

const STATS = [
  { to: 150, suffix: "+", label: "Impacted clients" },
  { to: 200, suffix: "M+", label: "Social engagements generated" },
  { to: 6, suffix: "", label: "Years in the industry" },
  { to: 1, suffix: "", label: "Senior strategist on your account" },
] as const;

/* Counts 0 → to with an eased rAF loop once `started` flips true */
function CountUp({
  to,
  suffix,
  started,
  duration = 1600,
}: {
  to: number;
  suffix: string;
  started: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return (
    <span className="mk-nm-value-num">
      {val}
      {suffix && <em>{suffix}</em>}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Numbers — proof stats + closing CTA                                */
/* ------------------------------------------------------------------ */

export default function Numbers() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  /* Scroll-reveal: .mk-nm-reveal gets .mk-nm-in when entering viewport */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-nm-reveal").forEach((el) => el.classList.add("mk-nm-in"));
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-nm-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-nm-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Trigger the count-ups when the stat grid becomes visible */
  useEffect(() => {
    const el = document.getElementById("mk-nm-grid");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mk-numbers" id="numbers">
      {/* ---------- ambient background (purple + ember glows) ---------- */}
      <div className="mk-nm-fx" aria-hidden="true">
        <div className="mk-nm-glow mk-nm-glow-purple" />
        <div className="mk-nm-glow mk-nm-glow-ember" />
        <div className="mk-nm-waves" />
      </div>

      <div className="mk-nm-inner">
        {/* ---------- header ---------- */}
        <header className="mk-nm-head mk-nm-reveal">
          <p className="mk-nm-eyebrow">( 05 ) — Numbers</p>
          <h2 className="mk-nm-title">
            Numbers I am <em>willing to defend.</em>
          </h2>
        </header>

        {/* ---------- stat cards ---------- */}
        <div className="mk-nm-grid mk-nm-reveal" id="mk-nm-grid" style={{ transitionDelay: "110ms" }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`mk-nm-card${i === 1 ? " mk-nm-card-hi" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <strong className="mk-nm-value">
                <CountUp to={s.to} suffix={s.suffix} started={inView} />
              </strong>
              <span className="mk-nm-label">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ---------- closing CTA ---------- */}
        <div className="mk-nm-cta mk-nm-reveal" id="contact" style={{ transitionDelay: "80ms" }}>
          <h3 className="mk-nm-cta-title">
            Let&rsquo;s make marketing simpler, <em>together.</em>
          </h3>
          <a className="mk-nm-btn" href="/contact">
            <span>Let&rsquo;s talk</span>
            <span className="mk-nm-btn-arrow" aria-hidden="true">
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
          </a>
        </div>
      </div>
    </section>
  );
}
