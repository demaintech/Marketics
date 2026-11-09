import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES.gamblino;

export const metadata: Metadata = {
  title: "Gamblino case study — Marketics",
  description:
    "Creating a brand for an on-chain casino: positioning, a bunny-led identity and a crypto-native voice that made Gamblino feel established before launch.",
};

export default function GamblinoCasePage() {
  return <CaseStudy data={data} />;
}
