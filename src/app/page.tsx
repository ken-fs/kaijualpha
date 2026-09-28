import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { codes, game, kaiju, verifiedKaiju, gaps, LAST_CHECKED, visitsPerFavourite } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { Reveal } from "@/components/reveal";
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
    <div>
      {/* Full-bleed hero: official key art + kenburns drift + readability gradients
          (aniimo.wiki pattern, atomic-night palette from the same art). */}
      <section className="relative flex min-h-[62vh] items-center overflow-hidden border-b rule md:min-h-[72vh]">
        <Image
          src="/images/brand/screenshot-2.png"
          alt="Kaiju Alpha key art — an atomic-breath Godzilla charging a spiral beam"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="kenburns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-20">
          <p className="text-xs font-medium tracking-widest text-primary uppercase">
            Roblox reference · updated {LAST_CHECKED}
          </p>
          <h1 className="text-shine mt-4 max-w-[16ch] text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Kaiju Alpha, documented honestly
          </h1>
          <p className="mt-5 max-w-[58ch] text-lg text-muted-foreground">
            {game.name} is a kaiju battlegrounds game from {game.developer}: collect
            Godzilla-era monsters, level them past 200, fight for G-cells. 53+ kaiju
            and a new update almost every day. We publish the numbers that exist and
            show you the gaps where they don&apos;t.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/kaiju/"
              className="inline-flex h-11 items-center rounded-[var(--radius-control)] bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              The kaiju roster ({kaiju.length})
            </Link>
            <Link
              href="/tier-list/"
              className="inline-flex h-11 items-center rounded-[var(--radius-control)] border border-foreground/25 bg-background/40 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-muted"
            >
              Tier list
            </Link>
            <Link
              href="/evolutions/"
              className="inline-flex h-11 items-center rounded-[var(--radius-control)] border border-foreground/25 bg-background/40 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-muted"
            >
              Evolution lines
            </Link>
          </div>

          {newestCode && (
            <div className="mt-8 flex max-w-xl flex-wrap items-center gap-3 rounded-[var(--radius-container)] border border-primary/30 bg-background/55 p-4 backdrop-blur">
              <span className="text-sm text-muted-foreground">
                {newestCode.status === "active" ? "Newest code (verified ×2 creators):" : "Newest code (unverified):"}
              </span>
              <CopyCode code={newestCode.code} />
              <span className="text-sm font-medium text-primary">{newestCode.reward}</span>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5">
        <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4 mt-10">
          <Fact label="Developer" value={game.developer} sub="Roblox experience" />
          <Fact label="Visits" value={nf.format(game.visits)} sub={`${nf.format(game.favorites)} favourites`} />
          <Fact label="Playing right now" value={nf.format(game.ccu)} sub={`${visitsPerFavourite} visits per favourite`} />
          <Fact label="Current update" value={game.currentUpdate} sub="game patch, not this page" />
        </section>

        {/* Category image cards — aniimo.wiki pattern: art + overlay + hover zoom. */}
        <Reveal className="mt-14">
          <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ArtCard
              href="/kaiju/"
              img="/images/brand/screenshot-1.png"
              imgPos="center 30%"
              title="Roster"
              body={`${verifiedKaiju.length} of ${kaiju.length} kaiju confirmed in the current build — every entry carries its source.`}
            />
            <ArtCard
              href="/tier-list/"
              img="/images/brand/screenshot-2.png"
              imgPos="center 60%"
              title="Tier list"
              body="The last published meta, dated and attributed — with the post-Update-40 gap marked, not guessed."
            />
            <ArtCard
              href="/evolutions/"
              img="/images/brand/screenshot-1.png"
              imgPos="center 70%"
              title="Evolutions"
              body="Form lines and objective unlocks, confirmed parts only. 'Evolved Godzilla requirements' has no good text answer — yet."
            />
            <ArtCard
              href="/codes/"
              img="/images/brand/screenshot-2.png"
              imgPos="center 20%"
              title="Codes"
              body="Every code with a status flag: unconfirmed, expired-risk, corroborated. Nothing 'working' without two sources."
            />
          </div>
        </Reveal>

        <div className="mt-10 hidden md:block">
          <AdsterraBanner slot={LEADERBOARD} />
        </div>

        <Reveal className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal">
            <h2 className="text-sm font-medium">What this site tracks</h2>
            <div className="mt-4 space-y-4">
              <TrackRow
                href="/kaiju/"
                title="Every playable kaiju"
                body={`${verifiedKaiju.length} of ${kaiju.length} tracked kaiju are confirmed in the current Update 51 build by a current source — the badge API, a live wiki page, or a named creator on camera.`}
              />
              <TrackRow
                href="/tier-list/"
                title="The tier list, with its age printed on it"
                body="The only published text tier list stopped at Update 24-39. We republish it as history — every entry dated, every price attributed to the creator who stated it."
              />
              <TrackRow
                href="/evolutions/"
                title="Evolution and unlock requirements"
                body="Players search 'evolved Godzilla requirements' and find only video predictions. We publish the confirmed objective unlocks and mark exactly what remains unverified."
              />
              <TrackRow
                href="/guide/"
                title="The G-cell economy"
                body="Assists pay full cells, reach beats kills, and the endgame kaiju cost 200,000-500,000 G-cells. Routes from named creators' recorded play."
              />
            </div>
          </div>

          <aside className="reveal space-y-6">
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
                Independent reference. Key art © {game.developer} via Roblox, shown as
                game identification. Stats shift almost every update; when a number here
                disagrees with your game, the game wins.
              </p>
            </div>

            <div className="md:hidden">
              <AdsterraBanner slot={RECTANGLE} />
            </div>
          </aside>
        </Reveal>
      </div>
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

function ArtCard({ href, img, imgPos, title, body }: { href: string; img: string; imgPos: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="glow-hover group relative block h-52 overflow-hidden rounded-[var(--radius-container)] border rule bg-card"
    >
      <Image
        src={img}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105"
        style={{ objectPosition: imgPos }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">{body}</p>
      </div>
    </Link>
  );
}

function TrackRow({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="glow-hover block rounded-[var(--radius-container)] border rule bg-card p-5"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
