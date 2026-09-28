import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, kaiju, verifiedKaiju, gaps, LAST_CHECKED, visitsPerFavourite } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Kaiju Alpha codes, every playable kaiju, and evolution requirements",
  description:
    "Every Kaiju Alpha code we could verify, the full playable kaiju roster with named sources, evolution and unlock requirements, and an honest map of what is still unpublished. Fan-made, with the source for every claim.",
  alternates: { canonical: "/" },
};

const nf = new Intl.NumberFormat("en-US");

export default function HomePage() {
  const newestCode = codes[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <section className="pt-14 pb-12">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Roblox reference · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          Kaiju Alpha, documented honestly
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">
          {game.name} is a kaiju battlegrounds game from {game.developer}: collect
          Godzilla-era monsters, level them past 200, and fight other players for
          G-cells. The roster passed 53 kaiju months ago and a new update lands
          almost daily. This site publishes the numbers that exist and shows you a
          gap where they do not.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/kaiju/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            The kaiju roster ({kaiju.length} tracked)
          </Link>
          <Link
            href="/tier-list/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Tier list
          </Link>
          <Link
            href="/evolutions/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Evolution lines
          </Link>
        </div>

        {newestCode && (
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="text-sm text-muted-foreground">Newest code (unverified):</span>
            <CopyCode code={newestCode.code} />
            <span className="text-sm text-muted-foreground">
              {codes.filter((c) => c.status === "unconfirmed").length} codes awaiting a
              second source — <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">see status</Link>
            </span>
          </div>
        )}
      </section>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Developer" value={game.developer} sub="Roblox experience" />
        <Fact
          label="Visits"
          value={nf.format(game.visits)}
          sub={`${nf.format(game.favorites)} favourites`}
        />
        <Fact
          label="Playing right now"
          value={nf.format(game.ccu)}
          sub={`${visitsPerFavourite} visits per favourite`}
        />
        <Fact label="Current update" value={game.currentUpdate} sub="game patch, not this page" />
      </section>

      <div className="mt-10 hidden md:block">
        <AdsterraBanner slot={LEADERBOARD} />
      </div>

      <section className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">What this site tracks</h2>
          <div className="mt-4 space-y-4">
            <TrackRow
              href="/kaiju/"
              title="Every playable kaiju"
              body={`${verifiedKaiju.length} of ${kaiju.length} tracked kaiju are confirmed in the current Update 51 build by a current source — the badge API, a live wiki page, or a named creator on camera. Each carries its own source note.`}
            />
            <TrackRow
              href="/tier-list/"
              title="The tier list, with its age printed on it"
              body="The only published text tier list stopped at Update 24-39. We republish it as history — every entry dated, every price attributed to the creator who stated it — and mark what a post-Update-40 meta would need to confirm."
            />
            <TrackRow
              href="/evolutions/"
              title="Evolution and unlock requirements"
              body="Players search 'evolved Godzilla requirements' and find only video predictions. We publish the confirmed objective unlocks (like Monster Zero's skull collection) and list exactly what remains unverified."
            />
            <TrackRow
              href="/guide/"
              title="The G-cell economy"
              body="Assists pay full cells, reach beats kills, and the endgame kaiju cost 200,000-500,000 G-cells. The farming routes here come from named creators' recorded play, not from us guessing."
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Still unpublished ({gaps.length} gaps)</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {gaps.slice(0, 5).map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="text-primary" aria-hidden="true">·</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about/"
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Why gaps are a feature, not a bug
            </Link>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-5">
            <h2 className="text-sm font-medium">Fan-made, source-first</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This is an independent reference. Stats shift almost every update; when a
              number here disagrees with your game, the game wins — tell us via the
              methods on <Link href="/about/" className="text-primary underline-offset-4 hover:underline">the about page</Link> and it gets rechecked.
            </p>
          </div>

          <div className="md:hidden">
            <AdsterraBanner slot={RECTANGLE} />
          </div>
        </aside>
      </section>
    </div>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular">{value}</dd>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function TrackRow({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="block rounded-[var(--radius-container)] border rule bg-card p-5 transition-colors hover:bg-muted/50"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
