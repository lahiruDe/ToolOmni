import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout-parts";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToolOmni | 100+ Free Online Tools for PDF, Image, Video & AI",
  description: "ToolOmni provides high-quality, free online utility tools for everyone. Merge PDFs, remove backgrounds, download videos, and use advanced AI writing assistants.",
  keywords: "free online tools, pdf tools, image background remover, tiktok downloader, ai writer, pdf to word, online video compressor",
  openGraph: {
    title: "ToolOmni - Professional Utility Tools",
    description: "The ultimate collection of free web tools for digital workflows.",
    type: "website",
    locale: "en_US",
    url: "https://toolomni.com", // Placeholder
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolOmni - Professional Utility Tools",
    description: "Free tools for PDF, Image, Video, and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col antialiased")}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
