import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { kaiju, game, LAST_CHECKED } from "@/data/game";
import { KaijuListJsonLd } from "@/components/json-ld";
import { VisualPageHeader } from "@/components/visual-page-header";
import { KAIJU_BADGES } from "@/lib/kaiju-art";

export const metadata: Metadata = {
  title: `Every playable kaiju in ${game.name} (${kaiju.length} tracked)`,
  description:
    "Every kaiju confirmed in the current Kaiju Alpha build, grouped by era — each with its source and last published tier. Unconfirmed names are flagged, not hidden.",
  alternates: { canonical: "/kaiju/" },
};

const ERAS = ["Singular Point", "Monsterverse", "Shin", "Heisei", "Millennium", "Final Wars", "Minus One", "Showa", "original"];

export default function KaijuIndexPage() {
  const grouped = ERAS.map((era) => ({
    era,
    list: kaiju.filter((k) => k.era === era),
  })).filter((g) => g.list.length > 0);

  const confirmed = kaiju.filter((k) => k.verified).length;
  const badgedKaiju = kaiju.filter((k) => KAIJU_BADGES[k.slug]);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <KaijuListJsonLd kaiju={kaiju} />
      <VisualPageHeader
        eyebrow={`Roster · updated ${LAST_CHECKED}`}
        title="The kaiju roster"
        image="/images/brand/screenshot-1.png"
        description={
          <>
            {confirmed} of {kaiju.length} entries are confirmed in the current{" "}
            {game.currentUpdate} build by a current source — the game&apos;s badge API, a
            live wiki page, or a named creator on camera. A creator&apos;s all-kaiju
            template counted <strong className="font-medium text-foreground">53 kaiju in
            June 2026</strong>, and updates add more almost daily, so treat this as a
            floor rather than a ceiling. Unconfirmed names stay listed because players
            search them — the flag tells you what to trust.
          </>
        }
      />

      <div className="space-y-12 pb-16">
        <section aria-labelledby="official-badges">
          <h2 id="official-badges" className="text-sm font-medium">Official Max badges</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Original monster artwork from the game&apos;s official Roblox badges. Choose a portrait to open its kaiju page.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {badgedKaiju.map((k) => (
              <li key={k.slug}>
                <Link href={`/kaiju/${k.slug}/`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-[var(--radius-container)] border rule bg-card">
                    <Image
                      src={KAIJU_BADGES[k.slug]!}
                      alt={`${k.name} — official Max badge artwork`}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-2 block text-sm font-medium leading-tight group-hover:text-primary">{k.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

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
