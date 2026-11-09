import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES.findit;

export const metadata: Metadata = {
  title: "FindIT case study — Marketics",
  description:
    "Building marketing around brand, content and growth for an IT recruitment company — +30% inbound leads and a LinkedIn engine with 650K+ organic impressions.",
};

export default function FindITCasePage() {
  return <CaseStudy data={data} />;
}
