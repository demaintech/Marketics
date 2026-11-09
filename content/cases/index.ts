import type { CaseSlug, CaseStudy } from "./types";
import { CASE_ORDER } from "./types";
import { dragonswap } from "./dragonswap";
import { prepia } from "./prepia";
import { gamblino } from "./gamblino";
import { findit } from "./findit";
import { snipersSale } from "./snipers-sale";
import { dellgardo } from "./dellgardo";

export * from "./types";

export const CASE_STUDIES: Record<CaseSlug, CaseStudy> = {
  prepia,
  dragonswap,
  gamblino,
  findit,
  "snipers-sale": snipersSale,
  dellgardo,
};

/** nav dropdown list, in the original site's order */
export const CASE_LIST: CaseStudy[] = CASE_ORDER.map((s) => CASE_STUDIES[s]);
