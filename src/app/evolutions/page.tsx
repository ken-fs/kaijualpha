import type { Metadata } from "next";
import Link from "next/link";
import { kaiju, game, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "Kaiju Alpha evolutions and unlock requirements",
  description:
    "Confirmed evolution lines and unlock requirements in Kaiju Alpha: Destoroyah's form chain, Mothra's larva-to-imago line, Monster Zero's skull-collection objective. Every unverified requirement is marked, not guessed.",
  alternates: { canonical: "/evolutions/" },
};

export default function EvolutionsPage() {
  const destroyahLine = kaiju.filter((k) => k.slug.startsWith("destoroyah"));
  const mothraLine = kaiju.filter((k) => k.slug.includes("mothra"));
  const jetjaguarLine = kaiju.filter((k) => k.slug.includes("jet-jaguar"));
  const monsterZero = kaiju.find((k) => k.slug === "monster-zero");

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-12 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Evolutions · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Evolution lines and unlock requirements
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          &quot;Evolved Godzilla requirements&quot; is one of the most searched
          questions about {game.name} and the answer has never been written down —
          only predicted in videos. This page publishes the lines that are confirmed,
          marks the requirements nobody has verified, and skips the guesses entirely.
        </p>
      </header>

      <div className="space-y-10 pb-16">
        <section>
          <h2 className="text-sm font-medium">Confirmed form lines</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <LineCard
              title="Destoroyah form chain"
              steps={["Destoroyah Aggregate", "Destoroyah Flying Form", "Destoroyah Final Form", "Perfect Form / Form 4 (referenced)"]}
              kaiju={destroyahLine}
              note="Four form pages exist on the live wiki, and the historical tier list treats the lineage as endgame. The exact evolution requirements between forms — levels, cells, kills — are unpublished by any named source."
            />
            <LineCard
              title="Mothra line"
              steps={["Mothra Larva 1964", "Mothra Imago 1964"]}
              kaiju={mothraLine}
              note="Larva-to-imago is canon for the character and both forms have live wiki pages. The in-game trigger (level? cells? both?) is unverified."
            />
            <LineCard
              title="Jet Jaguar variants"
              steps={["Jet Jaguar 1973", "Showa Jet Jaguar", "Hollow Jet Jaguar"]}
              kaiju={jetjaguarLine}
              note="Three variants documented on the wiki; whether they evolve from each other or unlock separately is unverified."
            />
          </div>
        </section>

        {monsterZero && (
          <section className="rounded-[var(--radius-container)] border rule bg-card p-6">
            <h2 className="text-sm font-medium">Objective unlocks — the confirmed shape</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
              <Link href={`/kaiju/${monsterZero.slug}/`} className="font-medium text-primary underline-offset-4 hover:underline">
                Monster Zero
              </Link>{" "}
              does not take a straight purchase: it unlocks through a{" "}
              <strong className="font-medium text-foreground">skull collection
              objective</strong>, and the route is to charge voltage into skill 5.
              The number of skulls required appears only in AI-generated wikis and is
              not verified by any named source — a real skull-locations video guide
              exists from the creator ItzVexo. Treat the count as unknown until you
              count them in game.
            </p>
          </section>
        )}

        <section className="rounded-[var(--radius-container)] border rule bg-muted/50 p-6">
          <h2 className="text-sm font-medium">Requirements nobody has published</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Per-kaiju evolution requirements (levels, G-cells, kill counts) — no verified table exists for any kaiju.</li>
            <li>&quot;Evolved Godzilla&quot; line — videos predict the requirements; nobody has published the confirmed path.</li>
            <li>Whether Max-progression (the badge line) is the same system as evolution, or a parallel track.</li>
            <li>Archetype spawn rules beyond &quot;every 30 minutes including private servers&quot; (Update 51 description).</li>
          </ul>
        </section>
      </div>
    </article>
  );
}

function LineCard({
  title,
  steps,
  kaiju: line,
  note,
}: {
  title: string;
  steps: string[];
  kaiju: typeof import("@/data/game").kaiju;
  note: string;
}) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <h3 className="font-medium">{title}</h3>
      <ol className="mt-3 space-y-1.5">
        {steps.map((s, i) => {
          const match = line.find((k) => s.toLowerCase().startsWith(k.name.toLowerCase().split(" ").slice(0, 2).join(" ").toLowerCase()) || k.name.toLowerCase().includes(s.toLowerCase().split(" ")[0]));
          return (
            <li key={s} className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{i + 1}.</span>
              {match ? (
                <Link href={`/kaiju/${match.slug}/`} className="text-primary underline-offset-4 hover:underline">
                  {s}
                </Link>
              ) : (
                <span className="text-muted-foreground">{s}</span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
