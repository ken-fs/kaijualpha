import type { Metadata } from "next";
import Link from "next/link";
import { kaiju, game, staleTiered, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "Kaiju Alpha tier list — the last published meta, dated and sourced",
  description:
    "The only text tier list ever published for Kaiju Alpha stopped at Update 24-39. We republish it as history: every placement attributed to the named creator who made it, every price dated, and the post-Update-40 meta marked as unverified.",
  alternates: { canonical: "/tier-list/" },
};

const ORDER = ["S", "A", "B", "C", "D"];

export default function TierListPage() {
  const tiers = ORDER.map((t) => ({
    tier: t,
    list: staleTiered.filter((k) => k.staleTier?.startsWith(t)),
  }));

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Tier list · record updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          The Kaiju Alpha tier list, with its age printed on it
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Nobody has published a text tier list for the current {game.currentUpdate}{" "}
          meta. What exists is the one serious attempt — from the dedicated site
          kaijualpha.com, written against the Update 24-39 roster with named creators
          on camera — and it stopped updating in 2026-05. Below is that record,
          preserved with its sources. The tier that matters today is the one{" "}
          <strong className="font-medium text-foreground">your</strong> lobby is
          playing; use this to see which kaiju were ever worth ranking and how.
        </p>
      </header>

      <div className="space-y-10 pb-16">
        {tiers.map(({ tier, list }) =>
          list.length === 0 ? null : (
            <section key={tier}>
              <h2 className="flex items-baseline gap-3 text-sm font-medium">
                <span className="font-mono text-lg">{tier}</span>
                <span className="text-muted-foreground">({list.length})</span>
              </h2>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
                {list.map((k) => (
                  <li key={k.slug} className="bg-card">
                    <Link
                      href={`/kaiju/${k.slug}/`}
                      className="block h-full p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium">{k.name}</span>
                        {k.stalePrice && (
                          <span className="shrink-0 text-xs text-muted-foreground tabular">
                            {k.stalePrice}
                          </span>
                        )}
                      </div>
                      {k.note && (
                        <p className="mt-1.5 line-clamp-3 text-xs text-muted-foreground">{k.note}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ),
        )}

        <section>
          <h2 className="text-sm font-medium">Unranked but real</h2>
          <p className="mt-2 max-w-[62ch] text-sm text-muted-foreground">
            These kaiju were confirmed to exist in the record but no named creator
            ever placed them — including some of the most searched names in the game
            (King Ghidorah, Godzilla Minus One, Skar King). Placing them would mean
            inventing the placement, so they stay here, honestly:
          </p>
          <p className="mt-3 flex flex-wrap gap-2">
            {kaiju
              .filter((k) => k.staleTier === "unranked" || k.staleTier === "unranked (stale era)")
              .map((k) => (
                <Link
                  key={k.slug}
                  href={`/kaiju/${k.slug}/`}
                  className="rounded-[var(--radius-control)] border rule px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {k.name}
                </Link>
              ))}
          </p>
        </section>

        <section className="rounded-[var(--radius-container)] border rule bg-muted/50 p-6">
          <h2 className="text-sm font-medium">What a current tier list would need</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>A named creator playing the post-Update-40 roster on camera — the last one&apos;s balance video is from the Update 24-39 era.</li>
            <li>Current prices: the only three prices ever published (500K/500K/200K G-cells) are from the Update 21-32 era.</li>
            <li>The nerf details: a named creator called Destoroyah overpowered pre-nerf, but nobody published what the nerf changed.</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            When one of those exists, this page gets a current section. Until then,
            the dated record above is the most honest tier list on the internet for
            this game.
          </p>
        </section>
      </div>
    </article>
  );
}
