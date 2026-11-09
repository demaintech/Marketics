"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";
import { CASE_LIST } from "@/content/cases";

/* Primary anchors — kept as-is on the home page, prefixed with "/"
   on the case-study pages so they still land on the home sections. */
const NAV_LINKS = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Process", hash: "#engagements" },
  { label: "Research", hash: "#research" },
];

/* Shared inline arrow icon (lime/purple bubble arrow in the original design) */
export function ArrowIcon({ className = "mk-arrow" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  /* ----- portfolio dropdown state ----- */
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ----- mobile menu state ----- */
  const [mobileOpen, setMobileOpen] = useState(false);

  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

  /* open with hover intent, close with a small grace delay */
  const openDrop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  };
  const scheduleDropClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropOpen(false), 140);
  };

  /* close on outside click / Escape / route change */
  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  /* route change closes everything */
  useEffect(() => {
    setDropOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="mk-header">
      <nav className="mk-nav" aria-label="Main">
        {/* Brand — extracted from the original site (MARKETICS.BIZ wordmark) */}
        <Link className="mk-brand" href="/" aria-label="Marketics home">
          <img
            className="mk-brand-logo"
            src="/images/logo-marketics.svg"
            alt="Marketics.biz"
          />
        </Link>

        {/* Center links */}
        <ul className="mk-nav-links">
          {NAV_LINKS.map(({ label, hash }) => (
            <li key={label}>
              <Link href={hrefFor(hash)}>{label}</Link>
            </li>
          ))}

          {/* ---------- Portfolio dropdown ---------- */}
          <li
            className={`mk-nav-drop${dropOpen ? " is-open" : ""}`}
            ref={dropRef}
            onMouseEnter={openDrop}
            onMouseLeave={scheduleDropClose}
          >
            <button
              type="button"
              className="mk-nav-drop-btn"
              aria-haspopup="true"
              aria-expanded={dropOpen}
              onClick={() => setDropOpen((v) => !v)}
            >
              Portfolio
              <svg className="mk-nav-chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="mk-nav-panel" role="group" aria-label="Case studies">
              <div className="mk-nav-panel-grid">
                {CASE_LIST.map((c, i) => (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    className="mk-nav-case"
                  >
                    <span className="mk-nav-case-idx">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mk-nav-case-name">
                      {c.brand} <em>case study</em>
                    </span>
                    <span className="mk-nav-case-cat">{c.category}</span>
                    <span className="mk-nav-case-go" aria-hidden="true">
                      <ArrowIcon className="mk-arrow" />
                    </span>
                  </Link>
                ))}
              </div>
              <Link className="mk-nav-panel-all" href="/#portfolio">
                View all work
                <ArrowIcon className="mk-arrow" />
              </Link>
            </div>
          </li>
        </ul>

        {/* Right cluster: CTA + burger */}
        <div className="mk-nav-right">
          <Link className="mk-btn mk-btn-nav" href="/contact">
            Let&apos;s talk
            <span className="mk-bubble mk-bubble-sm" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>

          <button
            type="button"
            className={`mk-burger${mobileOpen ? " is-open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ---------- mobile menu ---------- */}
      <div className={`mk-mobile${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mk-mobile-inner">
          <p className="mk-mobile-head">Menu</p>
          <ul className="mk-mobile-links">
            {NAV_LINKS.map(({ label, hash }) => (
              <li key={label}>
                <Link href={hrefFor(hash)} onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#portfolio" onClick={() => setMobileOpen(false)}>
                Portfolio
              </Link>
            </li>
          </ul>

          <p className="mk-mobile-head">Case studies</p>
          <ul className="mk-mobile-cases">
            {CASE_LIST.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} onClick={() => setMobileOpen(false)}>
                  <span className="mk-mobile-case-idx">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  {c.brand}
                  <em> case study</em>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            className="mk-btn mk-btn-nav mk-mobile-cta"
            href="/contact"
            onClick={() => setMobileOpen(false)}
          >
            Let&apos;s talk
            <span className="mk-bubble mk-bubble-sm" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}