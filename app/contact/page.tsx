import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Marketics",
  description:
    "Tell me about your brand and where you want it to go — every message gets a personal reply within 2 business days. hello@marketics.biz",
};

export default function ContactPage() {
  return <Contact />;
}
