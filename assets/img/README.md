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

## The About Us photograph

Two technicians servicing a wall-mounted split unit in a bright modern living room, portrait or
square — the panel is tall and sits beside the copy.

Add it as `about.webp`, then in `.aboutus__photo` change `--photo:none` to
`--photo:url("../img/about.webp")`. Until then the panel shows the illustration from
`assets/media/interior.svg`.

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

## Service card photographs — in use

These six are live. The card slot is 4:3 to match the supplied files, so
nothing is cropped. Replace a file in place (same name, same 4:3 crop) to
change a card; the illustration under `assets/media/services/` stays as the
fallback if a photo ever fails to load.

| File                    | CSS slot                     | Subject                          |
| ----------------------- | ---------------------------- | -------------------------------- |
| `svc-repair.webp`       | `.svc__media--repair`        | Technician opening an indoor unit|
| `svc-cleaning.webp`     | `.svc__media--cleaning`      | Filter being drawn out, gloved   |
| `svc-installation.webp` | `.svc__media--installation`  | Technician at an outdoor unit    |
| `svc-maintenance.webp`  | `.svc__media--maintenance`   | Remote check on a wall unit      |
| `svc-gas.webp`          | `.svc__media--gas`           | Manifold gauge set on a condenser|
| `svc-electrical.webp`   | `.svc__media--electrical`    | Wiring and control board         |

## Brand logos — in use

Nine logos are live, in `assets/img/brands/`: daikin, panasonic, midea, york,
samsung, lg, sharp, hitachi, acson. Each card gets its file through a
`--logo` custom property declared in `assets/css/styles.css`, and carries the
brand name as a visually hidden wordmark so screen readers and search engines
still read it.

To add another brand:

1. Save the logo as `assets/img/brands/<slug>.webp` — 300x120, transparent
   background, the mark centred with its own padding trimmed.
2. Add one CSS line next to the others:
   `.brands__item--<slug>{--logo:url("../img/brands/<slug>.webp")}`
3. Add the card in `index.html`:
   `<li class="brands__item brands__item--logo brands__item--<slug>"><span class="brands__mark">Name</span></li>`
4. Remove that brand from the "Also serviced" line below the grid.

Mitsubishi Electric, Toshiba, Fujitsu, Hisense, Gree, Haier and Sanyo are
named in that line rather than shown, because no logo was supplied for them.

Note: these are third-party trademarks shown to state which equipment is
serviced. Keep each logo in its correct proportions and original colours, do
not recolour or restyle them, and drop any brand the business does not
actually work on.

## Resolution notes

Background images scale to whatever the layout gives them, so the only
quality limit is the source file. Measured widest render, against what a 2x
(Retina) screen needs:

| File               | Source width | Widest render | 2x needs | Status         |
| ------------------ | -----------: | ------------: | -------: | -------------- |
| `about.webp`       |         1448 |           710 |     1420 | fine           |
| `cta-outdoor-unit` |         1448 |           710 |     1420 | fine           |
| `deco-split-unit`  |          600 |           300 |      600 | fine           |
| `hero.webp`        |         1672 |          1920 |     3840 | short on wide screens |
| `svc-*.webp`       |          600 |           340 |      680 | slightly short |
| `approach.webp`    |          300 |           710 |     1420 | short          |
| `step-*.webp`      |          600 |           330 |      660 | slightly short |

To sharpen the last three, re-export the originals larger and drop them in
under the same names — nothing in the CSS needs to change:

- hero: 2800px wide or more
- service and step cards: 1200x900 (keep the 4:3 crop)

## Decorative and banner artwork — in use

| File                    | Where                                                  |
| ----------------------- | ------------------------------------------------------ |
| `deco-split-unit.webp`  | Floating split unit, upper right of Services / How It Works / Brands |
| `deco-leaves.webp`      | Leaf cluster, upper left of the same sections           |
| `deco-leaf.webp`        | Single leaf accent, right edge of Services              |
| `cta-outdoor-unit.webp` | Right side of the closing CTA banner                    |
| `kl-skyline.webp`       | Pale skyline silhouette, lower left of the CTA banner    |

`deco-split-unit.webp` carries a white photo backdrop, so `.deco--unit-r`
feathers its edges with a radial mask. Keep that mask if you swap the file
for another photo on a white background; drop it for a cut-out PNG.
