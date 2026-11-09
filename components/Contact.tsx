"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import "./Contact.css";

/* ------------------------------------------------------------------ */
/*  Contact — ( 07 ) CONTACT page. Message-only form (no booking       */
/*  tabs): first/last name, email, message. Purple theme, glass cards, */
/*  reveal-on-scroll. Submit is simulated client-side — wire the       */
/*  marked spot to a real endpoint (API route / Formspree) when ready. */
/* ------------------------------------------------------------------ */

const INFO = [
  {
    value: "2 business days",
    label: "reply time",
    desc: "Every message is read and answered personally — no bots, no gatekeepers.",
  },
  {
    value: "30 minutes, free",
    label: "intro call",
    desc: "Prefer talking? Ask for a call in your message and I’ll send over a few times.",
  },
  {
    value: "hello@marketics.biz",
    label: "email",
    desc: "Happy to just write? Email directly — it lands in the same inbox as the form.",
    href: "mailto:hello@marketics.biz",
  },
];

type Status = "idle" | "sending" | "sent";
type Errors = { firstName?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* ----- reveal on scroll (same pattern as the other sections) ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".mk-ct-reveal").forEach((el) => el.classList.add("mk-ct-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("mk-ct-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".mk-ct-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ----- form state ----- */
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key as keyof Errors]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): Errors => {
    const er: Errors = {};
    if (!values.firstName.trim()) er.firstName = "Please add your first name.";
    if (!values.email.trim()) er.email = "Please add your email.";
    else if (!EMAIL_RE.test(values.email.trim())) er.email = "That email doesn’t look right.";
    if (!values.message.trim()) er.message = "Tell me a little about your project.";
    return er;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* ---- wire a real backend here, e.g.:
           await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) }) ---- */
    window.setTimeout(() => setStatus("sent"), 700);
  };

  const reset = () => {
    setValues({ firstName: "", lastName: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section className="mk-ct" ref={rootRef} id="contact-page">
      {/* ---------- ambient background ---------- */}
      <div className="mk-ct-fx" aria-hidden="true">
        <div className="mk-ct-glow mk-ct-glow-a" />
        <div className="mk-ct-glow mk-ct-glow-b" />
        <div className="mk-ct-grid" />
      </div>

      <div className="mk-ct-inner">
        <div className="mk-ct-cols">
          {/* ============ left: heading + info cards ============ */}
          <div className="mk-ct-intro">
            <p className="mk-ct-eyebrow mk-ct-reveal">( 07 ) — Contact</p>

            <h1 className="mk-ct-title mk-ct-reveal" style={{ transitionDelay: "60ms" }}>
              Let&rsquo;s talk. <em>Here to help.</em>
            </h1>

            <p className="mk-ct-lede mk-ct-reveal" style={{ transitionDelay: "120ms" }}>
              Tell me where your brand is now and where you want it to go —
              I&rsquo;ll come back with honest, practical next steps. One point
              of contact, from first message to final deliverable.
            </p>

            <ul className="mk-ct-cards">
              {INFO.map((c, i) => {
                const body = (
                  <>
                    <span className="mk-ct-card-value">{c.value}</span>
                    <span className="mk-ct-card-label">{c.label}</span>
                    <span className="mk-ct-card-desc">{c.desc}</span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a className="mk-ct-card mk-ct-reveal" href={c.href} style={{ transitionDelay: `${180 + i * 80}ms` }}>
                        {body}
                      </a>
                    ) : (
                      <div className="mk-ct-card mk-ct-reveal" style={{ transitionDelay: `${180 + i * 80}ms` }}>
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ============ right: message form card ============ */}
          <div className="mk-ct-panel mk-ct-reveal" style={{ transitionDelay: "140ms" }}>
            {status === "sent" ? (
              /* ---------- success state ---------- */
              <div className="mk-ct-done" role="status">
                <span className="mk-ct-done-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.6 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="mk-ct-done-title">
                  Message sent<em>.</em>
                </h2>
                <p className="mk-ct-done-text">
                  Thanks{values.firstName ? `, ${values.firstName.split(" ")[0]}` : ""} — I&rsquo;ll get
                  back to you within 2 business days. Talk soon.
                </p>
                <button type="button" className="mk-ct-again" onClick={reset}>
                  Send another message
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.8v2.9h-2.9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              /* ---------- form ---------- */
              <form className="mk-ct-form" onSubmit={onSubmit} noValidate>
                <p className="mk-ct-form-head">Send a message</p>

                <div className="mk-ct-row">
                  <div className="mk-ct-field">
                    <label htmlFor="ct-first">First name *</label>
                    <input
                      id="ct-first"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Jane"
                      value={values.firstName}
                      onChange={set("firstName")}
                      aria-invalid={!!errors.firstName}
                      className={errors.firstName ? "is-bad" : ""}
                    />
                    {errors.firstName && <p className="mk-ct-err">{errors.firstName}</p>}
                  </div>
                  <div className="mk-ct-field">
                    <label htmlFor="ct-last">Last name</label>
                    <input
                      id="ct-last"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={values.lastName}
                      onChange={set("lastName")}
                    />
                  </div>
                </div>

                <div className="mk-ct-field">
                  <label htmlFor="ct-email">Email *</label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    className={errors.email ? "is-bad" : ""}
                  />
                  {errors.email && <p className="mk-ct-err">{errors.email}</p>}
                </div>

                <div className="mk-ct-field">
                  <label htmlFor="ct-msg">Message *</label>
                  <textarea
                    id="ct-msg"
                    name="message"
                    rows={5}
                    placeholder="Hi! We’re launching in Q2 and need help with positioning, messaging and a content engine…"
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                    className={errors.message ? "is-bad" : ""}
                  />
                  {errors.message && <p className="mk-ct-err">{errors.message}</p>}
                </div>

                <button type="submit" className="mk-ct-submit" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                  <span className="mk-ct-submit-bubble" aria-hidden="true">
                    {status === "sending" ? (
                      <svg className="mk-ct-spin" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.8" />
                        <path d="M14 8A6 6 0 0 0 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2.5 8h10.5M8.6 3.6 13 8l-4.4 4.4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                <p className="mk-ct-note">No newsletters. No spam. Just a reply.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
