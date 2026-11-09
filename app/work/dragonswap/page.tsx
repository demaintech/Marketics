import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { CASE_STUDIES } from "@/content/cases";

const data = CASE_STUDIES.dragonswap;

export const metadata: Metadata = {
  title: "DragonSwap case study — Marketics",
  description:
    "Launching and growing a DeFi brand from zero: how DragonSwap became one of the leading decentralized exchanges on Sei in seven months.",
};

export default function DragonSwapCasePage() {
  return <CaseStudy data={data} />;
}
