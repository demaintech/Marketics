import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES["snipers-sale"];

export const metadata: Metadata = {
  title: "Snipers.sale case study — Marketics",
  description:
    "Rebranding & marketing strategy for a Swiss sales consultancy — 78 qualified leads, 7 new B2B clients and a €40K+ contract generated.",
};

export default function SnipersCasePage() {
  return <CaseStudy data={data} />;
}
