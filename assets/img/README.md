# Photography

## The hero photograph

Put the image here as **`hero.webp`** (or `hero.jpg`). The stylesheet already points at
`assets/img/hero.webp`, so nothing else needs changing — the file appears and it takes over.

If the file is missing or misnamed, the illustration in `assets/media/hero-service.svg` shows
instead, so the panel never ends up empty.

### What the hero shot needs

The panel covers the right side of the hero, roughly square on desktop, and the request card
overlaps its right third. So:

- Keep the subject **left of centre**. A technician on the far right disappears behind the card.
- Landscape or square, at least 1600px wide.
- The panel's left edge is faded out in CSS, so leave some quiet space on that side — the headline
  sits over it.

`background-position` for the photo is `62% center`. If the subject sits too far one way, change
that single value in `.hero__photo`.

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
