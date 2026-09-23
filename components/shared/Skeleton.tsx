/* ============================================================
   SKELETON — one placeholder block
   ------------------------------------------------------------
   A single grey stand-in for a piece of content that has not
   loaded yet, with a drop of ink spreading through it.

   Use it like this:

     <Skeleton shape="line" />
     <Skeleton shape="circle" />
     <Skeleton shape="media" index={2} />

   `index` is the block's place in the queue: drops land 60ms
   apart, so a screenful of these ripples rather than pulsing in
   unison. Give the blocks on a screen 0, 1, 2, 3 in reading
   order and it takes care of itself.

   Everything about how it LOOKS is in styles/components/
   skeleton.css and skeleton-ink.css.
   ============================================================ */

import type { CSSProperties } from "react";

type Shape = "line" | "heading" | "circle" | "button" | "media" | "block";

interface SkeletonProps {
  shape?: Shape;
  /** Any CSS width, e.g. "60%" or "var(--space-24)". */
  width?: string;
  /** Any CSS height. Most shapes already have a sensible one. */
  height?: string;
  /** Place in the queue — decides when this block's drop lands. */
  index?: number;
  className?: string;
}

/* Three edge treatments, handed out in rotation so that no two
   neighbouring blocks spread into the same shape. */
const EDGES = ["", " skeleton__field--b", " skeleton__field--c"];

export default function Skeleton({
  shape = "line",
  width,
  height,
  index = 0,
  className = "",
}: SkeletonProps) {
  /* Custom properties, not styling: these are the block's
     settings, which is the one thing markup is allowed to pass. */
  const settings = {
    "--skeleton-index": index,
    width,
    height,
  } as CSSProperties;

  return (
    /* aria-hidden because a screen reader gains nothing from a
       grey box. The word "Loading" comes from <SkeletonRegion />. */
    <span
      className={`skeleton skeleton--${shape} ${className}`}
      style={settings}
      aria-hidden="true"
    >
      <span className="skeleton__ink">
        <span className={`skeleton__field${EDGES[index % EDGES.length]}`}>
          <i className="skeleton__drop skeleton__drop--1" />
          <i className="skeleton__drop skeleton__drop--2" />
          <i className="skeleton__drop skeleton__drop--3" />
        </span>
      </span>
    </span>
  );
}
