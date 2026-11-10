import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Marketics",
  description:
    "Tell me about your brand and where you want it to go.",
};

export default function ContactPage() {
  return <Contact />;
}
