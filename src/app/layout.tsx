import type { Metadata } from "next";
import { Instrument_Serif, Inter, Space_Grotesk } from "next/font/google";
import { Web3Provider } from "@/providers/Web3Provider";
import "./globals.css";

/**
 * SovereignRealm Typography — The Sacred Scripts
 * Serif: Instrument Serif — For post body, the scroll of Aurelius
 * Sans: Inter — Clean UI labels
 * Mono: Space Grotesk — CID hashes & contract addresses
 */

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SovereignRealm - Your Digital Citadel",
  description: "Privacy-first, self-owned social platform. Your data, your keys, your rules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
