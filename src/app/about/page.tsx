import type { Metadata } from "next";
import Link from "next/link";
import { game, gaps, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "About this Kaiju Alpha reference — sources, method, and gaps",
  description:
    "How this site verifies Kaiju Alpha information: what counts as a source, why stale data is published with its age on it, and the list of things nobody has published yet.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          About · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          How this site handles the truth
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} patches almost daily — Update 51 arrived about six and a half
          weeks after launch. In a game that moves this fast, every stat page on the
          internet is wrong within a month unless someone re-checks it. This site is
          built around that fact instead of pretending it away.
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-medium">What counts as a source</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li><strong className="font-medium text-foreground">The game itself</strong> — its badge API, update descriptions, and in-game text. Strongest kind of source.</li>
              <li><strong className="font-medium text-foreground">A named creator on camera</strong> — someone showing the thing in recorded play (Nerdious Momentos, Tycooner, Mon Crex, ItzVexo). Real, but dated to their video.</li>
              <li><strong className="font-medium text-foreground">A live community wiki</strong> — real but uneven; we flag which page each claim came from.</li>
              <li><strong className="font-medium text-foreground">AI-generated wikis</strong> — not a source. Numbers that appear only there are labelled unverified, exactly as kaijualpha.com did before us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium">Why stale data stays, with its age on it</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              The only serious tier list this game ever had stopped at Update 24-39.
              Deleting it would leave you with nothing; presenting it as current would
              be a lie. So it stays, dated, attributed, and labelled historical — the
              same way a changelog works. When the first post-Update-40 meta gets
              published by a named creator, a current section appears on the tier list
              page and the record moves down.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium">Corrections</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              If something here disagrees with your game, the game wins. The strongest
              correction is a screenshot or a clip of the current build; the second
              strongest is two independent players reporting the same thing. Either
              moves a number within a check cycle. There is no comment section by
              design — uncorroborated comments are how wrong numbers spread.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium">What nobody has published ({gaps.length} open gaps)</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Site details</h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Game</dt>
                <dd className="font-medium">
                  <a href={game.robloxUrl} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                    {game.name} by {game.developer}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Coverage</dt>
                <dd className="font-medium">{game.currentUpdate}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last source pass</dt>
                <dd className="font-medium">{LAST_CHECKED}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium">Independent fan reference. Not affiliated with {game.developer} or Roblox. Kaiju names belong to their respective owners.</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-5">
            <h2 className="text-sm font-medium">Start here</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/kaiju/" className="text-primary underline-offset-4 hover:underline">The kaiju roster</Link></li>
              <li><Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">The dated tier list</Link></li>
              <li><Link href="/evolutions/" className="text-primary underline-offset-4 hover:underline">Evolution lines</Link></li>
              <li><Link href="/codes/" className="text-primary underline-offset-4 hover:underline">Codes with status flags</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
