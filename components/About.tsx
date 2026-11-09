"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./About.css";

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const MARQUEE = [
  { t: "SaaS growth", serif: true },
  { t: "Brand narrative", serif: false },
  { t: "Positioning", serif: true },
  { t: "Messaging", serif: true },
  { t: "Content strategy", serif: false },
  { t: "Campaigns", serif: true },
];

const FACTS = [
  { v: "6", plus: true, label: "Years in-house & consulting" },
  { v: "01", label: "Point of contact, start to finish" },
  { v: "SaaS", serif: true, label: "Tech & SaaS specialism" },
  { v: "PhD", serif: true, hi: true, label: "Researching AI in marketing" },
];

const SHOTS = [
  { src: "/images/speaker-1.jpg", tag: "Keynote", cap: "GTM School — on stage", span: "a" },
  { src: "/images/speaker-2.jpg", tag: "Podcast", cap: "Fireside interview", span: "b" },
  { src: "/images/speaker-3.jpg", tag: "Panel", cap: "SaaS community talk", span: "c" },
  { src: "/images/speaker-4.jpg", tag: "Workshop", cap: "Personal branding", span: "c" },
  { src: "/images/speaker-5.jpg", tag: "Guest lecture", cap: "Marketing that makes sense", span: "b" },
  { src: "/images/speaker-6.jpg", tag: "Masterclass", cap: "Full house, great questions", span: "a" },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

/* 4-point sparkle used as the marquee separator */
function Spark({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="mk-ab-spark"
      style={{ animationDelay: `${delay}s` }}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0c.9 6.8 4.3 10.2 12 12-7.7 1.8-11.1 5.2-12 12-.9-6.8-4.3-10.2-12-12C7.7 10.2 11.1 6.8 12 0Z" />
    </svg>
  );
}

/* Counts 0 → to with an eased rAF loop once `started` flips true */
function CountUp({
  to,
  suffix,
  started,
  duration = 1500,
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
    <span className="mk-ab-stat-num">
      {val}
      <em>{suffix}</em>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  About section                                                      */
/* ------------------------------------------------------------------ */

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [statsInView, setStatsInView] = useState(false);

  /* Scroll-reveal: any .mk-ab-reveal inside the section gets .mk-ab-in
     when it enters the viewport (staggered via inline transition-delay). */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-ab-reveal").forEach((el) => el.classList.add("mk-ab-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-ab-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".mk-ab-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Separate observer just to trigger the count-up numbers */
  useEffect(() => {
    const el = document.getElementById("mk-ab-stats");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mk-about" id="about">
      {/* ---------- shared svg defs (gradient ids live here, once) ---------- */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="mk-ab-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#d946ef" />
          </linearGradient>
          <linearGradient id="mk-ab-ul" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>

      {/* ---------- ambient background ---------- */}
      <div className="mk-ab-fx" aria-hidden="true">
        <div className="mk-ab-grid" />
        <div className="mk-ab-glow mk-ab-glow-a" />
        <div className="mk-ab-glow mk-ab-glow-b" />
        <div className="mk-ab-glow mk-ab-glow-c" />
        <div className="mk-ab-streak" />
      </div>

      {/* ---------- services marquee ---------- */}
      <div className="mk-ab-marquee">
        <div className="mk-ab-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {MARQUEE.map((m, i) => (
                <li key={m.t}>
                  <span className={m.serif ? "mk-ab-mq-serif" : "mk-ab-mq-sans"}>
                    {m.t}
                  </span>
                  <Spark delay={i * 0.4} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mk-ab-inner">
        {/* ---------- 01 — ABOUT statement ---------- */}
        <div className="mk-ab-head">
          <p className="mk-ab-eyebrow mk-ab-reveal">( 01 ) — About</p>
          <h2 className="mk-ab-statement mk-ab-reveal" style={{ transitionDelay: "90ms" }}>
            I’ve spent the past <em>six years</em> working in-house and
            consulting, mostly with tech and SaaS companies. I help founders
            clarify their positioning, sharpen their message, and turn it into
            content and campaigns that{" "}
            <span className="mk-ab-ulwrap">
              <em>make sense.</em>
              <svg
                className="mk-ab-ulsvg"
                viewBox="0 0 300 18"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9 C 80 17.5, 190 15.5, 294 4"
                  stroke="url(#mk-ab-ul)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* ---------- fact cards ---------- */}
        <div className="mk-ab-facts">
          {FACTS.map((f, i) => (
            <div
              key={f.v}
              className={`mk-ab-fact mk-ab-reveal${f.hi ? " mk-ab-fact-hi" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <strong className={f.serif ? "mk-ab-fact-serif" : ""}>
                {f.v}
                {f.plus && <em>+</em>}
              </strong>
              <p>{f.label}</p>
            </div>
          ))}
        </div>

        {/* ---------- Hi, I'm Milica! ---------- */}
        <div className="mk-ab-bio">
          <div className="mk-ab-bio-copy mk-ab-reveal">
            <h3 className="mk-ab-bio-title">
              Hi, I’m <em>Milica!</em>
            </h3>
            <p>
              Marketics is the marketing studio I built to work closely with
              startups and growing brands.
            </p>
            <p>
              When a project needs extra hands, I bring in trusted specialists
              from my network. You still get one point of contact and a clear
              process.
            </p>
            <p>
              Fun fact, I’m also pursuing a PhD focused on AI in marketing,
              bringing academic research into real-world work.
            </p>
          </div>

          <figure className="mk-ab-portrait mk-ab-reveal" style={{ transitionDelay: "140ms" }}>
            <Image
              src="/images/milica-dark.jpg"
              alt="Milica Balaban speaking — personal brand visual"
              fill
              sizes="(max-width: 980px) 100vw, 560px"
              className="mk-ab-portrait-img"
            />
            <span className="mk-ab-chip">
              <i aria-hidden="true" />
              Your single point of contact
            </span>
          </figure>
        </div>

        {/* ---------- The marketing stuff doesn't stop there ---------- */}
        <div className="mk-ab-stage mk-ab-reveal">
          <h3 className="mk-ab-stage-title">
            The marketing stuff <em>doesn’t stop there.</em>
          </h3>
          <p className="mk-ab-stage-sub">
            I create content, speak on stages and partner with brands I
            genuinely like. Somewhere along the way, quite a few people started
            paying attention.
          </p>

          <div className="mk-ab-stats" id="mk-ab-stats">
            <div className="mk-ab-stat">
              <CountUp to={32} suffix="K+" started={statsInView} />
              <span>LinkedIn followers</span>
            </div>
            <div className="mk-ab-stat">
              <CountUp to={4} suffix="M+" started={statsInView} />
              <span>Impressions in a year</span>
            </div>
            <div className="mk-ab-stat">
              <span className="mk-ab-stat-num">
                Top<em> 1%</em>
              </span>
              <span>Creator worldwide</span>
            </div>
          </div>
        </div>

        {/* ---------- speaking gallery ---------- */}
        <div className="mk-ab-gallery">
          {SHOTS.map((s, i) => (
            <figure
              key={s.src}
              className={`mk-ab-shot mk-ab-span-${s.span} mk-ab-reveal`}
              style={{ transitionDelay: `${(i % 3) * 110}ms` }}
            >
              <Image src={s.src} alt={s.cap} fill sizes="(max-width: 980px) 100vw, 40vw" />
              <figcaption>
                <span className="mk-ab-shot-tag">{s.tag}</span>
                <span className="mk-ab-shot-cap">{s.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
