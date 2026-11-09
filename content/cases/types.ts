/* ============================================================
   Case study content model — shared by all /work pages.
   Blocks map 1:1 to the original case-study pages; content is
   transcribed verbatim and only re-organised into sections.
   ============================================================ */

export type CaseStat = {
  value: string;
  label: string;
  note?: string;
};

export type CaseListItem = {
  /** bold lead-in, e.g. "X" / "Building trust without previous results" */
  lead?: string;
  text: string;
};

export type CaseQuote = {
  name: string;
  role: string;
  paras: string[];
  /** optional reviewer portrait, extracted from the original page */
  avatar?: string;
};

/** one frame inside a gallery block */
export type CaseImageItem = {
  src: string;
  alt: string;
};

export type CaseVideoItem = {
  /** relative to /public, e.g. "/video/cases/prepia/video-1.mp4" */
  src: string;
  poster: string;
  alt: string;
};

export type CaseBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; lead?: string; items: CaseListItem[] }
  | { kind: "stats"; items: CaseStat[] }
  | { kind: "quote"; quote: CaseQuote }
  /** single inline visual with an optional caption bar */
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      /** "narrow" constrains portrait/odd-ratio visuals */
      width?: "wide" | "narrow";
    }
  /** grid of visuals, e.g. brand-deck slides or social posts */
  | {
      kind: "gallery";
      images: CaseImageItem[];
      /** wide = 16:9 slides, square = social posts, mixed = free masonry */
      ratio?: "wide" | "square" | "mixed";
    }
  /** strip of muted looping portrait videos (original page had reels) */
  | { kind: "videos"; lead?: string; items: CaseVideoItem[] };

export type CaseSection = {
  title: string;
  blocks: CaseBlock[];
};

export type CaseStudy = {
  slug: string;
  /** brand part of the headline, e.g. "DragonSwap" */
  brand: string;
  /** descriptive part of the headline, e.g. "Launching and Growing a DeFi Brand from Zero" */
  titleRest: string;
  category: string;
  /** service chips — derived from the section titles of the case itself */
  tags: string[];
  /** optional credit line, e.g. "in collaboration with Lazar Mladenović" */
  collab?: string;
  /** portfolio-card image (also the fallback hero) */
  image: string;
  /** wide cover visual extracted from the original page, shown under the title */
  cover?: string;
  sections: CaseSection[];
};

/** Dropdown / next-prev order — matches the nav dropdown of the original site */
export const CASE_ORDER = [
  "prepia",
  "dragonswap",
  "gamblino",
  "findit",
  "snipers-sale",
  "dellgardo",
] as const;

export type CaseSlug = (typeof CASE_ORDER)[number];

/** neighbour lookup for the prev/next footer of each case page */
export function getAdjacentCases(
  map: Record<CaseSlug, CaseStudy>,
  slug: string
): { prev?: CaseStudy; next?: CaseStudy } {
  const i = CASE_ORDER.indexOf(slug as CaseSlug);
  if (i === -1) return {};
  const prevSlug = CASE_ORDER[(i - 1 + CASE_ORDER.length) % CASE_ORDER.length];
  const nextSlug = CASE_ORDER[(i + 1) % CASE_ORDER.length];
  return { prev: map[prevSlug], next: map[nextSlug] };
}
