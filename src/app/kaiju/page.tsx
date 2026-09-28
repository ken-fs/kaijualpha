import type { Metadata } from "next";
import Link from "next/link";
import { kaiju, game, LAST_CHECKED } from "@/data/game";
import { KaijuListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Every playable kaiju in ${game.name} (${kaiju.length} tracked)`,
  description:
    "The Kaiju Alpha kaiju roster: every monster we could confirm in the current build, grouped by era, with its source and the historical tier where one was ever published. Names without a current source are flagged, not hidden.",
  alternates: { canonical: "/kaiju/" },
};

const ERAS = ["Singular Point", "Monsterverse", "Shin", "Heisei", "Millennium", "Final Wars", "Minus One", "Showa", "original"];

export default function KaijuIndexPage() {
  const grouped = ERAS.map((era) => ({
    era,
    list: kaiju.filter((k) => k.era === era),
  })).filter((g) => g.list.length > 0);

  const confirmed = kaiju.filter((k) => k.verified).length;

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <KaijuListJsonLd kaiju={kaiju} />
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Roster · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          The kaiju roster
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {confirmed} of {kaiju.length} entries are confirmed in the current{" "}
          {game.currentUpdate} build by a current source — the game&apos;s badge API, a
          live wiki page, or a named creator on camera. A creator&apos;s all-kaiju
          template counted <strong className="font-medium text-foreground">53 kaiju in
          June 2026</strong>, and updates add more almost daily, so treat this as a
          floor rather than a ceiling. Unconfirmed names stay listed because players
          search them — the flag tells you what to trust.
        </p>
      </header>

      <div className="space-y-12 pb-16">
        {grouped.map(({ era, list }) => (
          <section key={era}>
            <h2 className="text-sm font-medium">
              {era} era <span className="ml-2 text-muted-foreground">({list.length})</span>
            </h2>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-3">
              {list.map((k) => (
                <li key={k.slug} className="bg-card">
                  <Link
                    href={`/kaiju/${k.slug}/`}
                    className="flex h-full flex-col justify-between gap-3 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{k.name}</span>
                        <StatusFlag verified={k.verified} />
                      </div>
                      {k.note && (
                        <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{k.note}</p>
                      )}
                    </div>
                    {k.staleTier && (
                      <p className="text-xs text-muted-foreground">
                        Historical tier (Update 24-39): <span className="font-mono">{k.staleTier}</span>
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

function StatusFlag({ verified }: { verified: boolean }) {
  return (
    <span
      className={
        "shrink-0 rounded-[var(--radius-control)] px-2 py-0.5 text-[11px] font-medium " +
        (verified ? "bg-primary/10 text-primary" : "border rule text-muted-foreground")
      }
    >
      {verified ? "confirmed" : "unconfirmed"}
    </span>
  );
}
