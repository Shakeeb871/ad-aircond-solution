# Photography

## The hero photograph

`hero.webp` — 1672x941, a technician at a wall-mounted split unit. It is composed for this
layout: the left half is a soft light gradient that the headline sits on, and the subject is in
the right half where the request card overlaps him.

It runs the **full width** of the hero rather than filling a right-hand panel, because that is
what its composition asks for. `assets/media/hero-service.svg` stays underneath as the fallback,
so a missing or misnamed file degrades to the illustration instead of leaving the hero empty.

To replace it, keep the same shape: landscape, at least 1600px wide, subject on the right, the
left third quiet enough for dark text. `background-position` is `center top` on desktop and
`72% center` once the layout stacks — adjust those two values in `.hero__photo` if a new shot
sits differently.

## Other image slots

The remaining artwork is illustration and lives in `assets/media/`. To replace any of it with
photography, set `--photo` on the matching rule:

| Slot | CSS rule | Crop |
| --- | --- | --- |
| About | `.frame--interior` | 6:5, min 1400px — a modern KL home or condo with a split unit on the wall |
| Approach | `.frame--workshop` | 6:5, min 1400px — technician at an outdoor condenser, tools in hand |
| CTA band | `.band__media` | 16:7, min 2400px — servicing in progress; sits under a turquoise overlay |
| Final CTA | `.finale__media` | 2:1, min 2400px — condenser units or a technician packing up; dark overlay |

Keep one look across all of them: real service work rather than posed shots, natural light, cool
white balance, Malaysian homes and premises, and equipment that matches the service described.
Export as WebP or JPEG around quality 80 and compress before committing.
