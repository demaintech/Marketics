"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./Footer.css";

/* ------------------------------------------------------------------ */
/*  Footer — adapted from the updated design into the purple theme.    */
/*  Brand + blurb → Studio / More / Follow columns (LinkedIn,          */
/*  Instagram + Facebook) → giant "marketics" wordmark → © bar.        */
/* ------------------------------------------------------------------ */

/* Social links — swap the hrefs for the real profile URLs when ready */
const SOCIALS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3.2"
          y="3.2"
          width="17.6"
          height="17.6"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.35" cy="6.65" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21.5v-8.24h2.77l.42-3.22H13.5V8c0-.93.26-1.57 1.6-1.57h1.7V3.54c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.14 1.5-4.14 4.26v2.37H7.4v3.22h2.77v8.24h3.33z" />
      </svg>
    ),
  },
];

/* Column links wired to the page sections */
const COLUMNS = [
  {
    head: "Studio",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
    ],
  },
  {
    head: "More",
    links: [
      { label: "Research", href: "#research" },
      // { label: "Engagements", href: "#engagements" },
      { label: "Numbers", href: "#numbers" },
    ],
  },
];

/* ------------------------------------------------------------------ */

export default function Footer() {
  const footRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  /* section anchors live on the home page — prefix them when we are
     on a case-study page so the links still land correctly */
  const hrefFor = (href: string) =>
    href.startsWith("#") && !onHome ? `/${href}` : href;

  /* Scroll-reveal: .mk-ft-reveal gets .mk-ft-in when entering viewport */
  useEffect(() => {
    const root = footRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-ft-reveal").forEach((el) => el.classList.add("mk-ft-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-ft-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".mk-ft-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={footRef} className="mk-footer">
      {/* ---------- ambient glow behind the wordmark ---------- */}
      <div className="mk-ft-fx" aria-hidden="true">
        <div className="mk-ft-glow" />
      </div>

      <div className="mk-ft-inner">
        {/* ---------- top: brand + link columns ---------- */}
        <div className="mk-ft-top">
          <div className="mk-ft-brand mk-ft-reveal">
            <a className="mk-ft-brandrow" href="#" aria-label="Marketics home">
              <img
                className="mk-ft-logo"
                src="/images/logo-marketics.svg"
                alt="Marketics.biz"
              />
            </a>
            <p className="mk-ft-blurb">
              A marketing studio for startups and growing brands. Strategy,
              message, content and campaigns — with one point of contact.
            </p>
          </div>

          <nav className="mk-ft-cols mk-ft-reveal" aria-label="Footer" style={{ transitionDelay: "90ms" }}>
            {COLUMNS.map((col) => (
              <div className="mk-ft-col" key={col.head}>
                <p className="mk-ft-head">{col.head}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={hrefFor(l.href)}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mk-ft-col">
              <p className="mk-ft-head">Follow</p>
              <div className="mk-ft-socials">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} aria-label={s.name} className="mk-ft-soc">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* ---------- giant wordmark ---------- */}
        <div className="mk-ft-word mk-ft-reveal" aria-hidden="true" style={{ transitionDelay: "140ms" }}>
          market<em>ics</em>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="mk-ft-bar">
          <p className="mk-ft-copy">© 2025 by Marketics.biz</p>
          <a className="mk-ft-toplink" href={onHome ? "#" : "/"}>
            Back to top
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 13V3.5M3.8 7.2 8 3l4.2 4.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
