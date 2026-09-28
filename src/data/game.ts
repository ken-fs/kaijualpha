import raw from "./game.json";

/**
 * Single source of truth for every claim on this site.
 *
 * Provenance rules, enforced by the shape of this file:
 *  - `verified: false` means the kaiju's name is real but no current source
 *    confirms it in the Update 51 build. Pages must render that as a gap.
 *  - `staleTier` / `stalePrice` are HISTORICAL — they describe the
 *    Update 24-39 meta per kaijualpha.com (last updated 2026-05) and must
 *    always be rendered with their age, never as "the current tier".
 *  - Codes carry `status`: unconfirmed | expired-risk. Nothing is listed as
 *    "working" until two independent sources agree.
 *  - The `gaps` list is rendered on /about/ rather than left implicit.
 */

export type Kaiju = {
  name: string;
  slug: string;
  era: string;
  verified: boolean;
  source: string;
  staleTier: string | null;
  stalePrice: string | null;
  note: string | null;
};

export type Code = {
  code: string;
  reward: string;
  sources: number;
  status: "unconfirmed" | "expired-risk";
  note: string;
};
export type System = { name: string; detail: string };

export const game = raw.game;
export const kaiju = raw.kaiju as Kaiju[];
export const codes = raw.codes as Code[];
export const systems = raw.systems as System[];
export const gaps = raw.gaps as string[];

/** Kaiju confirmed in the current build by a current source. */
export const verifiedKaiju = kaiju.filter((k) => k.verified);

/** Stale-era tier entries — rendered only as historical reference. */
export const staleTiered = kaiju.filter((k) => k.staleTier);

export const LAST_CHECKED = "2026-09-28";

/**
 * Visits per favourite — the retention proxy from the site fleet playbook.
 * 434 here: players stick with this game (fleet range 19-3,700).
 */
export const visitsPerFavourite = game.visitsPerFavourite;
