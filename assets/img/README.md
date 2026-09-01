# Photography

The page currently ships with original SVG artwork in `assets/media/`. Every image slot is built as
a two-layer CSS background, so swapping in a real photograph is a **one-line change per slot** —
the SVG stays underneath as a fallback and no markup changes.

## How to swap in a photograph

1. Put the file in this folder, e.g. `assets/img/hero-technician.jpg`.
2. In `assets/css/styles.css`, find the slot's rule and set `--photo`:

```css
.hero__photo   { --photo:url("../img/hero-technician.jpg"); }
.frame--interior { --photo:url("../img/living-room-split.jpg"); }
.frame--workshop { --photo:url("../img/condenser-service.jpg"); }
.band__media   { --photo:url("../img/servicing-wide.jpg"); }
.finale__media { --photo:url("../img/outdoor-units.jpg"); }
```

That is it. If the file is missing or fails to load, the SVG layer beneath still renders.

## Slots and what each one needs

| Slot | CSS rule | Crop | Brief |
| --- | --- | --- | --- |
| Hero | `.hero__photo` | roughly square, min 1600px wide | Technician servicing a wall-mounted split unit in a bright modern room. Keep the subject **left of centre**: the panel sits on the right of the hero and the Request AC Service card covers its right third. The left edge is masked to fade into the page. |
| About | `.frame--interior` | 6:5, min 1400px wide | A modern Kuala Lumpur home or condo interior with a split unit visible on the wall. Daylight, uncluttered. |
| Approach | `.frame--workshop` | 6:5, min 1400px wide | Technician at an outdoor condenser with gauges or tools in hand. Close enough to read as real service work. |
| CTA band | `.band__media` | 16:7 wide, min 2400px wide | Servicing in progress — coil cleaning, filter removal. Sits under a turquoise overlay, so composition matters more than detail. |
| Final CTA | `.finale__media` | 2:1 wide, min 2400px wide | Outdoor condenser units on a wall or rooftop, or a technician packing up. Sits under a dark teal overlay. |

## Art direction

Keep one consistent look across all five so the page reads as a single shoot:

- Real service work, not people posing for the camera.
- Natural light, cool white balance, low saturation. No orange or heavy HDR.
- Malaysian residential and commercial settings — condos, terrace houses, shoplots, offices.
- Equipment that matches the work described: wall splits, outdoor condensers, gauges, vacuum
  pumps, jet-wash bags, filters.
- Avoid: stock-looking smiles, ducted-industrial HVAC that is not the service on offer,
  low-resolution crops, obviously AI-generated hands or equipment.

Export as JPEG (quality ~80) or WebP, sized to the widths above. Compress before committing —
the hero image is the largest thing on the page.
