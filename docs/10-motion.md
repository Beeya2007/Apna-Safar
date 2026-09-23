# Motion

Animation. Motion here has one job: to say **what changed**.

If an animation is not answering that question, it should not exist. Nothing in
this system runs longer than 320ms.

---

## The rule of thumb

**The smaller and more frequent an interaction, the faster it must be.** A hover
happens hundreds of times an hour, so it is 120ms and invisible as an animation.
A drawer happens twice a session, so it can afford 320ms to show where it came
from.

---

## Duration

| Token | Value | For |
|---|---|---|
| `--motion-instant` | 0ms | must feel like it already happened |
| `--motion-fast` | 120ms | hover, focus, press, colour, shadow |
| `--motion-normal` | 200ms | dropdown, tooltip, popover, collapse |
| `--motion-slow` | 320ms | modal, drawer, sheet |

Lives in [`styles/design-system/14-motion.css`](../styles/design-system/14-motion.css).

Past 320ms a transition stops reading as feedback and starts reading as latency.
Above ~150ms a *hover* already feels laggy. There is no `slower` — a transition
needing 500ms is nearly always the wrong pattern.

---

## Easing

| Token | Curve | When |
|---|---|---|
| `--ease-linear` | `linear` | **Loops only.** A spinner has no start or end to ease. |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0.2, 1)` | The default — something on screen that is changing. |
| `--ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | **Arriving** — decelerates into place. |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | **Leaving** — accelerates away. |
| `--ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Rare. A transition that *is* the moment. |

**A component never writes its own `cubic-bezier`.** An easing curve is a house
accent; five of them in one interface is a stutter.

**Exits are faster than entrances.** An entrance is showing you something new.
An exit is getting out of the way.

---

## Distance, scale, opacity

**Distance has no tokens of its own.** A thing sliding 8px is travelling one
spacing step — use `--space-1`, `--space-2`, `--space-4`, `--space-6`. A second
set of the same four numbers is a second thing to keep in sync.

| Scale token | Value | When |
|---|---|---|
| `--motion-scale-in` | 0.98 | entering |
| `--motion-scale-rest` | 1 | at rest |
| `--motion-scale-press` | 0.97 | pressed |

All within 3% of resting — past about 5% the interface feels rubbery.

**Opacity is 0 or 1.** A half-faded control is a disabled control, and that is
the colour foundation's job, not something to signal with transparency.

---

## Patterns

From [`15-motion-patterns.css`](../styles/design-system/15-motion-patterns.css).
A component picks one rather than inventing an animation.

| Class | Animates | For |
|---|---|---|
| `.motion-fade` | opacity | the safest pattern, and every other one's fallback |
| `.motion-slide-up` / `-down` | translate + opacity | a surface with a source |
| `.motion-scale-in` | scale + opacity | something with nowhere to come from |
| `.motion-collapse` | grid rows | opening and shutting |
| `.motion-interactive` | colour, shadow, press scale | hover and press on any control |
| `.motion-spin` / `.motion-shimmer` | transform / background | loading |

Every one animates only `transform` and `opacity` — the two properties the
browser can move without redoing layout or paint.

`.motion-collapse` uses `grid-template-rows: 0fr → 1fr`, the one way to animate
to *auto* height without measuring in JavaScript and without a `max-height`
that clips long content.

---

## Transforms by component

| Component | Transform |
|---|---|
| Dropdown, menu, tooltip, popover | `translateY` + opacity |
| Modal | `scale` + opacity |
| Drawer, sheet, toast | `translateX` / `translateY` |
| Accordion | grid rows |

**Never `translate` a modal.** It did not come from anywhere; sliding it in
invents a spatial relationship that does not exist.

---

## Hover and press

| State | What moves | Duration |
|---|---|---|
| Hover | background, border, shadow — **never size or position** | `--motion-fast` |
| Press | scale to 0.97 | `--motion-fast` |
| Focus | nothing — the ring appears instantly | `--motion-instant` |
| Disabled | nothing | — |

**Hover must not change an element's box.** A control that grows on hover shoves
its neighbours around, and on a dense grid it can move the thing you were about
to click.

**Press goes in, never out.** **Focus never animates** — a ring that fades in is
one you cannot find while tabbing.

---

## Loading

| | Duration | Easing |
|---|---|---|
| Spinner | `--motion-loop-spin` 700ms | linear |
| Skeleton shimmer | `--motion-loop-shimmer` 1400ms | linear |

Loops are slower than transitions on purpose — a fast loop is a flicker.

**Wait 400ms before showing a spinner** (`--motion-delay-long`). Most requests
finish inside it, and a spinner that flashes for 80ms is worse than none. A
skeleton beats a spinner whenever you know the shape of what is coming.

---

## Stagger and delay

| Token | Value | For |
|---|---|---|
| `--motion-stagger-sm` | 30ms | a list of rows |
| `--motion-stagger-md` | 60ms | a few large cards |
| `--motion-delay-short` | 60ms | a tooltip's grace period |
| `--motion-delay-long` | 400ms | before a loading spinner |

**Stagger no more than about six items.** The seventh is already 180ms behind
the first, and the list reads as a slow page.

**A delay before feedback is a bug.** These are for sequencing, never for
slowing a response to a click.

---

## Reduced motion

**Not "turn everything off".** Someone who asked for less motion still needs to
know a menu opened; removing the feedback is worse than the animation was.

| | Normally | Reduced |
|---|---|---|
| Opacity fades | yes | **yes — this carries the information** |
| Travel | one spacing step | 0 |
| Scale | 0.98 / 0.97 | 1 |
| `--motion-normal` / `--motion-slow` | 200 / 320ms | 120ms |
| Stagger and delay | 30–60ms | 0 |
| Spinner, shimmer | looping | **stopped, and still visible** |

It all happens by **changing the tokens**, in one media query at the bottom of
`14-motion.css`. A component that reads them gets the behaviour free and needs
no media query of its own.

Loops stop completely — repetitive movement is the specific thing vestibular
disorders react to. They stay *visible* as static shapes, which is why anything
using one must also say "Loading" in words.

---

## Accessibility and performance

- **Nothing flashes.** Never animate anything faster than 3Hz.
- **Never signal state by motion alone** — an animation is invisible to a screen
  reader. Change text, colour or an ARIA attribute too.
- **Never move a focused element** out from under the keyboard.
- **`transform` and `opacity` only.** Animating `height`, `top` or `width`
  forces layout on every frame.
- **CSS transitions and keyframes.** This project has no animation library and
  does not need one — adding one would mean two systems that drift apart. Use a
  transition when a state changes, keyframes when something enters, leaves or
  loops.

---

## Do and don't

| Don't | Do |
|---|---|
| `transition: transform 0.3s ease` | `var(--motion-normal) var(--ease-standard)` |
| A `@keyframes` block in a component file | A pattern class |
| Animating `height` or `top` | `transform` and `opacity` |
| A 300ms exit | Exits faster than entrances |
| Growing an element on hover | Colour and shadow only |
| Disabling every animation for reduced motion | Drop travel and scale, keep the fade |
| Flashing a spinner for 80ms | Wait 400ms first |
| `transition: all` | Name the properties |
