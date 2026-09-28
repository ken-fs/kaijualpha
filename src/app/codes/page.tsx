import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Kaiju Alpha codes — every code and its verification status",
  description:
    "Kaiju Alpha codes with an honest status on each: unconfirmed, expired-risk, or corroborated. Nothing is listed as working until two independent sources agree. Redeem steps and where codes actually come from.",
  alternates: { canonical: "/codes/" },
};

export default function CodesPage() {
  const unconfirmed = codes.filter((c) => c.status === "unconfirmed");
  const expiredRisk = codes.filter((c) => c.status === "expired-risk");

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Codes · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Kaiju Alpha codes
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          This game ships a new code with most updates — Update 51&apos;s announcement
          says &quot;new code&quot; outright. The big media sites (GameRant, Pocket
          Tactics, Beebom, ProGameGuides) already fight over code clicks, so this page
          competes on honesty instead: every code below carries its{" "}
          <strong className="font-medium text-foreground">verification status</strong>,
          and nothing is called &quot;working&quot; until two independent sources have
          it.
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <section>
            <h2 className="text-sm font-medium">
              Awaiting a second source ({unconfirmed.length})
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real codes from a real source, but only one so far. Try them in game —
              they either work or they don&apos;t, and your report moves them up.
            </p>
            <ul className="mt-4 space-y-2">
              {unconfirmed.map((c) => (
                <li
                  key={c.code}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-container)] border rule bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <CopyCode code={c.code} />
                    <span className="text-sm text-muted-foreground">{c.reward}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-sm font-medium">Expired risk ({expiredRisk.length})</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              These come from the Update 20-39 era per the only archived code list
              (kaijualpha.com, last updated 2026-05). Milestone codes this old are
              usually rotated out — expect failure, report success.
            </p>
            <ul className="mt-4 space-y-2">
              {expiredRisk.map((c) => (
                <li
                  key={c.code}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-container)] border rule bg-muted/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <CopyCode code={c.code} />
                    <span className="text-sm text-muted-foreground">{c.reward}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 hidden md:block">
            <AdsterraBanner slot={LEADERBOARD} />
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">How to redeem</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Open {game.name} on Roblox.</li>
              <li>Find the codes button on the main menu or in-game HUD (a gift or Twitter-bird icon — it moves between updates).</li>
              <li>Type or paste the code exactly — they are case-sensitive.</li>
              <li>Rewards land immediately; if it says invalid, the code rotated out.</li>
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">
              Exact button location varies by update; if the menu changed, the current
              codes video for the newest update shows it on screen.
            </p>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-5">
            <h2 className="text-sm font-medium">Why this page looks different</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Most codes pages list everything as &quot;working&quot; and quietly delete
              the failures. This one is maintained like a changelog: sources counted,
              age stated, guesses labelled. If you want the fastest possible list, the
              big media sites update hourly — if you want to know whether a code is
              real, that is what this page is for.
            </p>
            <Link
              href="/about/"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Our source rules
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
