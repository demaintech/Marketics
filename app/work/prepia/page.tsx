import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES.prepia;

export const metadata: Metadata = {
  title: "Prepia case study — Marketics",
  description:
    "Building the marketing for Serbia’s fastest-growing startup as first marketing hire — scaling Prepia from 100,000 to 500,000+ users across 100+ exam apps.",
};

export default function PrepiaCasePage() {
  return <CaseStudy data={data} />;
}
