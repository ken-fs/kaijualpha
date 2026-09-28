import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kaiju, game, type Kaiju } from "@/data/game";

export function generateStaticParams() {
  return kaiju.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kaiju/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const k = kaiju.find((x) => x.slug === slug);
  if (!k) return {};
  const title = k.verified
    ? `${k.name} in Kaiju Alpha: era, unlock status and historical tier`
    : `${k.name} in Kaiju Alpha: unconfirmed for the current build`;
  return {
    title,
    description: k.verified
      ? `${k.name} (${k.era} era) is a playable kaiju in Kaiju Alpha. What is confirmed today, what the last published tier list said — with its age printed on it — and what nobody has published.`
      : `${k.name} appears in the Kaiju Alpha record but no current source confirms it in the Update 51 build. Here is what that means and how to check in game.`,
    alternates: { canonical: `/kaiju/${k.slug}/` },
  };
}

export default async function KaijuPage({ params }: PageProps<"/kaiju/[slug]">) {
  const { slug } = await params;
  const k = kaiju.find((x) => x.slug === slug);
  if (!k) notFound();

  const others = kaiju.filter((x) => x.era === k.era && x.slug !== k.slug);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/kaiju/" className="hover:text-foreground">
          Kaiju
        </Link>
        <span className="px-2 text-border" aria-hidden="true">/</span>
        <span className="text-foreground">{k.name}</span>
      </nav>

      <header className="pt-6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip k={k} />
          <span className="rounded-[var(--radius-control)] border rule px-3 py-1 text-xs text-muted-foreground">
            {k.era} era
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {k.name}
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {k.verified ? (
            <>
              {k.name} is confirmed as a playable kaiju in {game.name} (
              {game.currentUpdate}) by: <strong className="font-medium text-foreground">{k.source}</strong>.
              Stats in this game are rebalanced almost every update, so this page tracks
              what is structurally true — era, unlock shape, evolution line — and dates
              anything that could have shifted.
            </>
          ) : (
            <>
              {k.name} appears in the public record for {game.name}, but no current
              source confirms it in the {game.currentUpdate} build. That is a gap in the
              public record, not an oversight on this page — check in game before
              planning around it.
            </>
          )}
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">What is confirmed</h2>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
            <Stat label="Era" value={k.era} />
            <Stat label="In current build" value={k.verified ? "yes" : "unconfirmed"} />
            <Stat
              label="Historical tier"
              value={k.staleTier ? `${k.staleTier} (Update 24-39)` : "never published"}
            />
          </dl>

          {k.stalePrice && (
            <div className="mt-8 rounded-[var(--radius-container)] border rule bg-card p-5">
              <h2 className="text-sm font-medium">Unlock cost — historical</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The only price ever published for {k.name}:{" "}
                <strong className="font-medium text-foreground">{k.stalePrice}</strong>.
                This comes from the Update 21-39 era and named creators, and has very
                likely changed since. Treat it as an order-of-magnitude reference, not a
                current number.
              </p>
            </div>
          )}

          {k.note && (
            <>
              <h2 className="mt-12 text-sm font-medium">Notes from the record</h2>
              <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">{k.note}</p>
            </>
          )}

          <h2 className="mt-12 text-sm font-medium">Where this comes from</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            {k.source.charAt(0).toUpperCase() + k.source.slice(1)}. If you can confirm
            anything further — a current price, a moveset, an evolution requirement —
            the verification methods on{" "}
            <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
              the about page
            </Link>{" "}
            are where this site takes corrections.
          </p>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Unlocking and evolving</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {k.name}
              {k.stalePrice
                ? " has a published unlock path (left), and possibly an evolution line — "
                : " has no published unlock requirements yet. "}
              confirmed objective unlocks and the known evolution lines live on the{" "}
              <Link href="/evolutions/" className="text-primary underline-offset-4 hover:underline">
                evolutions page
              </Link>
              , with the unverified parts marked rather than guessed.
            </p>
          </div>

          {others.length > 0 && (
            <div>
              <h2 className="text-sm font-medium">Other {k.era} era kaiju</h2>
              <ul className="mt-3 space-y-1.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/kaiju/${o.slug}/`}
                      className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                    >
                      <span>{o.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground tabular">
                        {o.verified ? "confirmed" : "unconfirmed"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              The full roster is 53+ kaiju and grows most weeks.{" "}
              <Link href="/kaiju/" className="font-medium text-primary underline-offset-4 hover:underline">
                Browse the whole list
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function StatusChip({ k }: { k: Kaiju }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-[var(--radius-control)] px-3 py-1 text-xs font-medium " +
        (k.verified
          ? "bg-primary text-primary-foreground"
          : "border rule text-muted-foreground")
      }
    >
      {k.verified ? "Confirmed · current build" : "Name in record · build unconfirmed"}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold tabular">{value}</dd>
    </div>
  );
}
