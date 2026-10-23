import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { WebsiteJsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { LAST_CHECKED } from "@/data/game";

// Fonts are self-hosted (src/fonts, OFL). next/font/google downloads them during the build,
// and when that download flakes on Cloudflare's builders the whole build fails
// ("Can't resolve '@vercel/turbopack-next/internal/font/google/font'", 2026-10-06).
const geistSans = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 2026-10-23：模板不再追加 "| Kaiju Alpha Guide"。每个页面标题里本来就有 "Kaiju Alpha"，
  // 这个 20 字符的尾巴把全站标题顶到 66–108 字符，SERP 全部截断、游戏名出现两次。
  title: {
    default: "Kaiju Alpha (Roblox) — Codes, Kaiju Roster & Evolutions",
    template: "%s",
  },
  description:
    "Kaiju Alpha (Roblox) — codes with their verification status, the full kaiju roster by era, evolution lines and unlock requirements. Sourced, no invented numbers.",
  openGraph: {
    type: "website",
    siteName: "Kaiju Alpha Guide",
    images: [{ url: "/og.png", width: 768, height: 432, alt: "Kaiju Alpha — atomic-breath Godzilla key art" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <head>{/* Atomic-night dark theme is the only theme (kaiju key-art palette). */}</head>
      <body className="flex min-h-full flex-col antialiased">
        <WebsiteJsonLd name="Kaiju Alpha Guide" />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-medium">Kaiju Alpha Guide</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An independent player reference. Not affiliated with SULU KAKA or
              Roblox Corporation. Kaiju names and game art belong to their owners.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Last source pass: {LAST_CHECKED}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/codes/" className="text-muted-foreground hover:text-foreground">
              Codes
            </Link>
            <Link href="/kaiju/" className="text-muted-foreground hover:text-foreground">
              Kaiju
            </Link>
            <Link href="/evolutions/" className="text-muted-foreground hover:text-foreground">
              Evolutions
            </Link>
            <Link href="/tier-list/" className="text-muted-foreground hover:text-foreground">
              Tier list
            </Link>
            <Link href="/guide/" className="text-muted-foreground hover:text-foreground">
              Guide
            </Link>
            <Link href="/about/" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t rule pt-6">
          <p className="text-xs text-muted-foreground">
            Community-reported data with sources attached. Confirm in game — this one patches almost daily.
          </p>
        </div>
      </div>
    </footer>
  );
}
