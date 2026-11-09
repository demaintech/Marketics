"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Subtle mouse parallax on the flowing background light.
     Sets --mx / --my (-0.5 … 0.5) on the section; the wave layers
     translate by a few pixels through CSS calc(). */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mk-hero">
      {/* ---------- Animated background: waves, streaks, grid, lens flare ---------- */}
      <div className="mk-fx" aria-hidden="true">
        <div className="mk-grid" />

        <div className="mk-parallax mk-parallax-back">
          <div className="mk-wave mk-wave-c" />
          <div className="mk-streak mk-streak-b" />
          <svg
            className="mk-lines"
            viewBox="0 0 1200 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M0 210 C 260 90, 520 330, 760 210 S 1120 110, 1200 190" />
            <path d="M0 240 C 260 120, 520 360, 760 240 S 1120 140, 1200 220" />
            <path d="M0 270 C 260 150, 520 390, 760 270 S 1120 170, 1200 250" />
            <path d="M0 300 C 260 180, 520 420, 760 300 S 1120 200, 1200 280" />
          </svg>
        </div>

        <div className="mk-parallax mk-parallax-front">
          <div className="mk-wave mk-wave-a" />
          <div className="mk-wave mk-wave-b" />
          <div className="mk-streak mk-streak-a" />
          <div className="mk-flare" />
          <div className="mk-flare mk-flare-dot" />
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="mk-hero-inner">
        <div className="mk-hero-left">
          <div className="mk-badge">
            <span className="mk-badge-dot">
              <span />
            </span>
            Taking on new startup partners this quarter
          </div>

          <h1 className="mk-title">
            Your <em>Go-To</em>
            <br />
            <span className="mk-ul-wrap">
              Marketer
              <svg
                className="mk-ul-svg"
                viewBox="0 0 300 18"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="mk-ul-grad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
                <path
                  d="M6 9 C 80 17.5, 190 15.5, 294 4"
                  stroke="url(#mk-ul-grad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mk-lede">
            Marketics is a marketing studio built to work closely with
            startups and growing brands — clarifying positioning, sharpening
            the message, and turning it into content and campaigns that land.
          </p>

          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-hero" href="#">
              Start a project
              <span className="mk-bubble mk-bubble-lg" aria-hidden="true">
                <svg
                  className="mk-arrow"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                    stroke="#7C3AED"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a className="mk-btn-ghost" href="#">
              Explore services
            </a>
          </div>

          <div className="mk-social">
            <div className="mk-avatars">
              <Image
                src="/images/avatar-1.jpg"
                alt="Startup founder"
                width={38}
                height={38}
              />
              <Image
                src="/images/avatar-2.jpg"
                alt="Startup founder"
                width={38}
                height={38}
              />
              <Image
                src="/images/avatar-3.jpg"
                alt="Startup founder"
                width={38}
                height={38}
              />
              <span className="mk-plus" aria-hidden="true">
                +
              </span>
            </div>
            <p>
              Trusted by founders across
              <br />
              <strong>tech &amp; SaaS</strong>
            </p>
          </div>
        </div>

        {/* ---------- Founder photo + floating cards ---------- */}
        <div className="mk-hero-right">
          <figure className="mk-photo">
            <Image
              src="/images/founder.jpg"
              alt="Milica Balaban, Founder & Strategist"
              fill
              priority
              sizes="447px"
              className="mk-photo-img"
            />

            <div className="mk-years-card">
              <span className="mk-years-icon">6+</span>
              <span className="mk-years-text">
                <strong>Years</strong>
                <small>In-house &amp; consulting</small>
              </span>
            </div>

            <div className="mk-phd-card">
              <div className="mk-phd-label">
                <svg
                  viewBox="0 0 24 24"
                  fill="#C4B5FD"
                  aria-hidden="true"
                  className="mk-phd-icon"
                >
                  <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3zM5 12.5V16c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.5l-7 3.18-7-3.18z" />
                </svg>
                PHD IN PROGRESS
              </div>
              <p>AI in marketing — research applied to real work.</p>
            </div>

            <figcaption>
              <span className="mk-name">Milica Balaban</span>
              <span className="mk-role">Founder &amp; Strategist</span>
            </figcaption>

            <button className="mk-scroll" aria-label="Scroll down">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 2.5v10.5M3.6 8.9 8 13.3l4.4-4.4"
                  stroke="#ffffff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </figure>
        </div>
      </div>
    </section>
  );
}
