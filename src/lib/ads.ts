// Adsterra ad units — single source of truth.
//
// Copy each unit's GET CODE snippet verbatim into `src`. The network has used at
// least two shapes over time and they are not interchangeable:
//
//   old:  <script src="//www.highrevenueformat.com/<key>/invoke.js"></script>
//   new:  <script src="https://bauval.org/22/<key>"></script>
//
// Guessing the URL from the key produced a 404 on this account's units, so the
// full URL is stored rather than reconstructed.
//
// A slot with an empty key renders nothing, so this file is safe to ship before
// a unit is approved — ads appear only once the key is filled in.
//
// NOTE: ads.txt is NOT required for Adsterra banners to serve (unlike AdSense,
// which hard-requires it). Fleet experience across several Adsterra sites: no
// ads.txt, ads fill fine. Skip the dashboard ads.txt step entirely.

export type AdSlot = {
  key: string;
  width: number;
  height: number;
  /** Exact script URL from the dashboard's GET CODE snippet. */
  src: string;
};

/** 728×90 leaderboard. Desktop only — it overflows phones. */
export const LEADERBOARD: AdSlot = {
  key: "2262c0335ec1bffc0e0506836ffef2e9",
  width: 728,
  height: 90,
  src: "https://bauval.org/22/2262c0335ec1bffc0e0506836ffef2e9",
};

/** 300×250 rectangle. Fits every viewport. */
export const RECTANGLE: AdSlot = {
  key: "9d1c553a780ff761c6dd077a12126689",
  width: 300,
  height: 250,
  src: "https://bauval.org/22/9d1c553a780ff761c6dd077a12126689",
};
