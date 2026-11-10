import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ---- Brand fonts — self-hosted woff2 (src/app/fonts) ----
   Local files instead of next/font/google: no network dependency at
   build time, identical rendering everywhere.
   --font-inter        → body / UI text (variable 100–900)
   --font-inter-tight  → big display headline (variable 100–900)
   --font-instrument   → italic serif accent ("Go-To", signature)
   --font-space-mono   → mono label ("PHD IN PROGRESS")            */
const inter = localFont({
  src: "./fonts/inter-normal-100-900.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const interTight = localFont({
  src: "./fonts/inter-tight-normal-100-900.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-normal-400.woff2", style: "normal" },
    { path: "./fonts/instrument-italic-400.woff2", style: "italic" },
  ],
  variable: "--font-instrument",
  weight: "400",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marketics | Your Go-To Marketer",
  description:
    "Marketics is a marketing studio built to work closely with startups and growing brands — clarifying positioning, sharpening the message, and turning it into content and campaigns that land.",
  /* favicon comes from src/app/icon.png (Next.js file convention),
     extracted from the original marketics.biz site */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${spaceMono.variable} antialiased`}
      >
        <div className="mk-page">
          {/* Header is global — it renders on every page, above the page content */}
          <Header />
          {/* Page content goes here — e.g. app/page.tsx renders <Hero /> */}
          <main>{children}</main>
          {/* Footer is global — it renders on every page, below the content */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
