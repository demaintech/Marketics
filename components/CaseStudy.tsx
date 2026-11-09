"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import "./CaseStudy.css";
import {
  CASE_ORDER,
  CASE_STUDIES,
  getAdjacentCases,
  type CaseBlock,
  type CaseImageItem,
  type CaseVideoItem,
  type CaseStudy as CaseStudyData,
} from "@/content/cases";
import { CASE_MEDIA } from "@/content/cases/media";

/* ------------------------------------------------------------------ */
/*  CaseStudy — shared editorial template for all /work/[slug] pages.  */
/*  Blueprint-grid hero → numbered sections → inline visuals from the  */
/*  original pages → stat cards → quotes → prev/next → closing CTA.    */
/*  Content comes verbatim from the data module; this component only   */
/*  decides how it is organised.                                       */
/* ------------------------------------------------------------------ */

function Figure({
  item,
  sizes = "(min-width: 1024px) 760px, 92vw",
  priority = false,
}: {
  item: CaseImageItem;
  sizes?: string;
  priority?: boolean;
}) {
  /* Known intrinsic size → natural-ratio fluid image (no crop, no CLS).
     Unknown → fill mode inside an aspect-ratio frame. */
  const dims = CASE_MEDIA[item.src];
  if (dims) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={dims[0]}
        height={dims[1]}
        sizes={sizes}
        priority={priority}
        className="mk-cs-img"
      />
    );
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
    />
  );
}

function Gallery({
  images,
  ratio = "wide",
  priority = false,
}: {
  images: CaseImageItem[];
  ratio?: "wide" | "square" | "mixed";
  priority?: boolean;
}) {
  const cls =
    ratio === "square"
      ? "mk-cs-gallery is-square"
      : ratio === "mixed"
        ? "mk-cs-gallery is-mixed"
        : "mk-cs-gallery is-wide";
  return (
    <div className={cls}>
      {images.map((it, i) => (
        <figure
          className="mk-cs-gallery-item mk-cs-reveal"
          style={{ "--i": Math.min(i % 4, 3) } as React.CSSProperties}
          key={it.src}
        >
          <Figure
            item={it}
            priority={priority && i < 2}
            sizes={
              ratio === "square"
                ? "(min-width: 1024px) 340px, 46vw"
                : "(min-width: 1024px) 480px, 92vw"
            }
          />
        </figure>
      ))}
    </div>
  );
}

function VideoStrip({ items }: { items: CaseVideoItem[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  /* Play each reel only while it is on screen; otherwise pause it. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const vids = Array.from(wrap.querySelectorAll("video"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      vids.forEach((v) => v.removeAttribute("autoplay"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mk-cs-videos" ref={wrapRef}>
      {items.map((v, i) => (
        <figure
          className="mk-cs-video mk-cs-reveal"
          style={{ "--i": i } as React.CSSProperties}
          key={v.src}
        >
          <video
            src={v.src}
            poster={v.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={v.alt}
          />
        </figure>
      ))}
    </div>
  );
}

function Block({
  block,
  priority = false,
}: {
  block: CaseBlock;
  priority?: boolean;
}) {
  switch (block.kind) {
    case "p":
      return <p className="mk-cs-p">{block.text}</p>;

    case "h3":
      return <h3 className="mk-cs-h3">{block.text}</h3>;

    case "list":
      return (
        <div className="mk-cs-list-wrap">
          {block.lead ? <p className="mk-cs-p">{block.lead}</p> : null}
          <ul className="mk-cs-list">
            {block.items.map((it, i) => (
              <li key={i}>
                {it.lead ? <strong>{it.lead}</strong> : null}
                {it.lead ? " — " : ""}
                {it.text}
              </li>
            ))}
          </ul>
        </div>
      );

    case "stats":
      return (
        <div className="mk-cs-stats">
          {block.items.map((s) => (
            <div className="mk-cs-stat" key={s.label}>
              <span className="mk-cs-stat-value">{s.value}</span>
              <span className="mk-cs-stat-label">{s.label}</span>
              {s.note ? <span className="mk-cs-stat-note">{s.note}</span> : null}
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <figure
          className={`mk-cs-quote${block.quote.avatar ? " has-avatar" : ""}`}
        >
          <span className="mk-cs-quote-mark" aria-hidden="true">
            “
          </span>
          {block.quote.avatar ? (
            <span className="mk-cs-quote-avatar">
              <Image
                src={block.quote.avatar}
                alt={block.quote.name}
                fill
                sizes="96px"
              />
            </span>
          ) : null}
          <div className="mk-cs-quote-body">
            {block.quote.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <figcaption className="mk-cs-quote-by">
            <span className="mk-cs-quote-name">{block.quote.name}</span>
            <span className="mk-cs-quote-role">{block.quote.role}</span>
          </figcaption>
        </figure>
      );

    case "image":
      return (
        <figure
          className={`mk-cs-figure-inline mk-cs-reveal${
            block.width === "narrow" ? " is-narrow" : ""
          }`}
        >
          <div className="mk-cs-figure-frame">
            <Figure item={block} priority={priority} />
          </div>
          {block.caption ? (
            <figcaption className="mk-cs-figure-bar">
              <span>{block.caption}</span>
            </figcaption>
          ) : null}
        </figure>
      );

    case "gallery":
      return (
        <div className="mk-cs-gallery-wrap">
          <Gallery images={block.images} ratio={block.ratio} priority={priority} />
        </div>
      );

    case "videos":
      return (
        <div className="mk-cs-videos-wrap">
          {block.lead ? <p className="mk-cs-p">{block.lead}</p> : null}
          <VideoStrip items={block.items} />
        </div>
      );
  }
}

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const idx = CASE_ORDER.indexOf(data.slug as (typeof CASE_ORDER)[number]);
  const { prev, next } = getAdjacentCases(CASE_STUDIES, data.slug);

  /* Scroll-reveal: .mk-cs-reveal gets .mk-cs-in when entering viewport */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root
        .querySelectorAll(".mk-cs-reveal")
        .forEach((el) => el.classList.add("mk-cs-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-cs-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".mk-cs-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <article ref={rootRef} className="mk-cs">
      {/* ---------- ambient background ---------- */}
      <div className="mk-cs-fx" aria-hidden="true">
        <div className="mk-cs-grid-bg" />
        <div className="mk-cs-glow mk-cs-glow-a" />
        <div className="mk-cs-glow mk-cs-glow-b" />
      </div>

      {/* ================= HERO ================= */}
      <header className="mk-cs-hero">
        <div className="mk-cs-hero-top mk-cs-reveal">
          <Link className="mk-cs-back" href="/#portfolio">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.5 8H3M7.4 3.6 3 8l4.4 4.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All work
          </Link>
          <p className="mk-cs-eyebrow">
            ( CASE STUDY ) — {String(idx + 1).padStart(2, "0")} /{" "}
            {String(CASE_ORDER.length).padStart(2, "0")}
          </p>
        </div>

        <h1 className="mk-cs-title mk-cs-reveal" style={{ "--i": 1 } as React.CSSProperties}>
          {data.brand}
          <span className="mk-cs-title-sep">: </span>
          <em>{data.titleRest}</em>
        </h1>

        {data.collab ? (
          <p
            className="mk-cs-collab mk-cs-reveal"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {data.collab}
          </p>
        ) : null}

        <div
          className="mk-cs-chips mk-cs-reveal"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <span className="mk-cs-chip mk-cs-chip-cat">{data.category}</span>
          {data.tags.map((t) => (
            <span className="mk-cs-chip" key={t}>
              {t}
            </span>
          ))}
        </div>

        <figure
          className="mk-cs-figure mk-cs-reveal"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Image
            src={data.cover ?? data.image}
            alt={`${data.brand} — ${data.titleRest}`}
            fill
            priority
            sizes="100vw"
          />
          <figcaption className="mk-cs-figure-bar">
            <span>{data.brand}</span>
            <span>{data.category}</span>
          </figcaption>
        </figure>
      </header>

      {/* ================= SECTIONS ================= */}
      <div className="mk-cs-body">
        {data.sections.map((sec, si) => (
          <section
            className="mk-cs-sec mk-cs-reveal"
            key={sec.title}
            style={{ "--i": Math.min(si, 3) } as React.CSSProperties}
          >
            <div className="mk-cs-sec-head">
              <span className="mk-cs-num">
                ( {String(si + 1).padStart(2, "0")} )
              </span>
              <h2 className="mk-cs-sec-title">{sec.title}</h2>
            </div>
            <div className="mk-cs-sec-body">
              {sec.blocks.map((b, bi) => (
                <Block block={b} key={bi} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ================= PREV / NEXT ================= */}
      <nav className="mk-cs-next mk-cs-reveal" aria-label="More case studies">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="mk-cs-next-card is-prev">
            <span className="mk-cs-next-tag">← Previous case</span>
            <span className="mk-cs-next-name">
              {prev.brand} <em>{prev.titleRest}</em>
            </span>
            <span className="mk-cs-next-img">
              <Image src={prev.image} alt="" fill sizes="33vw" />
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="mk-cs-next-card is-next">
            <span className="mk-cs-next-tag">Next case →</span>
            <span className="mk-cs-next-name">
              {next.brand} <em>{next.titleRest}</em>
            </span>
            <span className="mk-cs-next-img">
              <Image src={next.image} alt="" fill sizes="33vw" />
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {/* ================= CLOSING CTA ================= */}
      <section className="mk-cs-cta mk-cs-reveal">
        <h2 className="mk-cs-cta-title">
          Let&apos;s make marketing <em>simpler</em>, together.
        </h2>
        <a className="mk-cs-btn" href="/#contact">
          Let&apos;s talk
          <span className="mk-cs-btn-bubble" aria-hidden="true">
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
      </section>
    </article>
  );
}
