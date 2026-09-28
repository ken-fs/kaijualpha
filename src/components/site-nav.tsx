"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { game } from "@/data/game";

const LINKS = [
  { href: "/codes/", label: "Codes" },
  { href: "/kaiju/", label: "Kaiju" },
  { href: "/tier-list/", label: "Tier list" },
  { href: "/evolutions/", label: "Evolutions" },
  { href: "/guide/", label: "Guide" },
];

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b rule bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <SpineMark />
          <span className="text-sm font-semibold tracking-tight">Kaiju Alpha</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "rounded-[var(--radius-control)] px-3 py-1.5 text-sm transition-colors " +
                (isActive(l.href)
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-[var(--radius-control)] sm:inline-flex"
          >
            <a href={game.robloxUrl} target="_blank" rel="noopener">
              Play on Roblox
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-[var(--radius-control)] lg:hidden"
                aria-label="Open menu"
              >
                <List size={18} weight="bold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="px-4 pt-4 text-sm font-semibold">Menu</SheetTitle>
              <nav className="mt-4 flex flex-col px-2" aria-label="Mobile">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={
                      "rounded-[var(--radius-container)] px-3 py-2.5 text-sm " +
                      (isActive(l.href)
                        ? "bg-muted font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground")
                    }
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/about/"
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-container)] px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/**
 * Dorsal-plate mark: three Godzilla-style spine plates rising off a baseline.
 * Reads as "kaiju" before the wordmark, and is a different silhouette from
 * the paw/geometric marks other reference sites in the fleet use.
 */
function SpineMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M4 19 L7.5 8 L10 19 Z" fill="currentColor" />
      <path d="M9.5 19 L12.5 4 L15.5 19 Z" fill="currentColor" />
      <path d="M15 19 L18.5 9 L21 19 Z" fill="currentColor" />
      <rect x="3" y="19.4" width="18" height="1.8" rx="0.9" fill="currentColor" />
    </svg>
  );
}
