import type { Metadata } from "next";
import Link from "next/link";
import { systems, game, LAST_CHECKED } from "@/data/game";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Kaiju Alpha beginner guide — the G-cell economy and first kaiju",
  description:
    "How Kaiju Alpha actually works: G-cells pay on damage so reach beats kills, endgame kaiju cost 200K-500K cells, and the first kaiju worth buying is Biollante. Routes from named creators' recorded play, dated and sourced.",
  alternates: { canonical: "/guide/" },
};

export default function GuidePage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Guide · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          The G-cell economy, explained
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} looks like a fighting game and plays like a farming game.
          Almost everything — every kaiju, every upgrade — is priced in G-cells, and
          the way cells flow decides how fast you progress. These are the rules as
          named creators have demonstrated them on camera; anything that changed in
          recent updates is flagged.
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-medium">Rule 1 — Assists pay full cells</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              G-cells come from damaging other players, and{" "}
              <strong className="font-medium text-foreground">assists pay in
              full</strong>. That single rule inverts the obvious strategy: you do not
              need to win fights, you need to touch as many players as possible.
              Long-range beams and area attacks earn cells faster than chasing kills,
              because a kill ends one income stream while chip damage keeps several
              open. (Tycooner and Mon Crex, recorded play — Update 24-39 era, no
              source has reported this changing.)
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium">Rule 2 — The endgame has a price band</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              The only three kaiju prices ever stated on camera: Space Godzilla and
              Shimo around <strong className="font-medium text-foreground">500,000
              G-cells</strong>, Monster X at <strong className="font-medium text-foreground">200,000</strong>{" "}
              with no prerequisites. If a price you see quoted for another kaiju
              isn&apos;t in that band, ask where it came from — most numbers floating
              around trace back to AI-generated wikis. (Historical, Update 21-32 era.)
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium">Rule 3 — Buy for reach, then for tier</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              The one kaiju a named creator recommends to new players outright is{" "}
              <Link href="/kaiju/biollante/" className="text-primary underline-offset-4 hover:underline">
                Biollante
              </Link>{" "}
              — qualified in the same breath with &quot;still slow&quot;.{" "}
              <Link href="/kaiju/heisei-godzilla/" className="text-primary underline-offset-4 hover:underline">
                Heisei Godzilla
              </Link>{" "}
              is the farming pick: pulse and twin beams snipe crowds from range while
              you bank cells for the 200K-500K band. Chasing tier before reach is how
              new players stall — a D-tier kaiju played at range out-earns an S-tier
              kaiju played in the pile.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium">Rule 4 — Levels past 200 are the real game</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              Creator gameplay centres on kaiju past level 200 — a Space Godzilla at
              200 was shown clearing a crowd in two button presses, and nothing is
              published about how anything performs below that. Plan your first weeks
              around one kaiju you intend to max, not a stable of half-built ones.
              The badge line (&quot;Max &lt;Kaiju&gt;&quot;) exists for exactly that
              commitment.
            </p>
          </section>

          <div className="hidden md:block">
            <AdsterraBanner slot={LEADERBOARD} />
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Game systems</h2>
            <dl className="mt-4 space-y-4">
              {systems.map((s) => (
                <div key={s.name}>
                  <dt className="text-sm font-medium">{s.name}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{s.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-5">
            <h2 className="text-sm font-medium">Where the routes came from</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Named creators on camera: Nerdious Momentos (balance commentary, prices),
              Tycooner (skill routes, archetype play), Mon Crex (recorded play),
              ItzVexo (skull locations). All routes are from the Update 21-39 era —
              this game patches fast, and{" "}
              <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
                the about page
              </Link>{" "}
              explains how corrections get checked.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
