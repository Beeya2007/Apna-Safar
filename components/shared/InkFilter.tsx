/* ============================================================
   INK FILTER — the SVG that makes the loading ink look liquid
   ------------------------------------------------------------
   Rendered ONCE, in app/layout.tsx. Draws nothing on screen; it
   only defines filters that skeleton-ink.css points at.

   Each filter does three things to the soft circles handed to
   it, in order:

     1. BLUR them, so their edges overlap.
     2. CRUSH the transparency of that blur, so the overlap
        snaps into one solid blob. This is what stops three
        circles reading as three circles.
     3. PUSH the blob's outline around with noise, so the edge
        is ragged like a stain rather than round like a balloon.
        Then a last small blur takes the hard edge off again.

   Three variants, differing only in the noise. Two placeholders
   side by side use different ones so they never bloom into the
   same shape.
   ============================================================ */

/* Edit these to change the character of the edge.
   frequency — smaller is a slower, larger wobble
   wobble    — how far the edge is pushed, in pixels
   seed      — which piece of noise; any number, just not equal  */
const EDGES = [
  { id: "skeleton-ink-a", frequency: "0.011 0.017", wobble: 26, seed: 3 },
  { id: "skeleton-ink-b", frequency: "0.014 0.012", wobble: 21, seed: 11 },
  { id: "skeleton-ink-c", frequency: "0.009 0.020", wobble: 30, seed: 19 },
];

export default function InkFilter() {
  return (
    <svg className="skeleton-filters" aria-hidden="true" focusable="false">
      <defs>
        {EDGES.map((edge) => (
          /* The region is oversized: a filter clips to its own
             box by default, and the wobble pushes past the edge. */
          <filter key={edge.id} id={edge.id} x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={edge.frequency}
              numOctaves={2}
              seed={edge.seed}
              result="noise"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="soft" />
            {/* The last row is the alpha channel: multiply it up,
                then subtract, which leaves only the thick middle
                of the blur and throws its faint halo away. */}
            <feColorMatrix
              in="soft"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -8"
              result="blob"
            />
            <feDisplacementMap
              in="blob"
              in2="noise"
              scale={edge.wobble}
              xChannelSelector="R"
              yChannelSelector="G"
              result="ragged"
            />
            <feGaussianBlur in="ragged" stdDeviation="3" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
