import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Three families, all loaded with Cyrillic (confirmed in next/font's
// font-data.json — page is authored in Russian):
//   Geist        → UI / body
//   Geist Mono   → agent names, step numbers, contract nodes
//   Source Serif 4 → the "Честный момент" climax (beat 4), the one serif voice
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Реплей прогона — Feedback→Roadmap",
  description:
    "Один прогон агентного пайплайна: бриф → ресёрч → информационная архитектура.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
