import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES.dellgardo;

export const metadata: Metadata = {
  title: "Dellgardo case study — Marketics",
  description:
    "Digital presence for a fashion brand — a website relaunch, content system and analytics that grew organic traffic by 118% and monthly revenue by 15%.",
};

export default function DellgardoCasePage() {
  return <CaseStudy data={data} />;
}
