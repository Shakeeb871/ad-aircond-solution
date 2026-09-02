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

## Brand logos (optional)

The Brands We Service cards render each brand as a wordmark set in the site's
own typeface, so the section is complete without any files. Official logo
artwork can be swapped in per card, one at a time.

For each brand, add the logo file here (SVG preferred, otherwise a
transparent PNG at least 400px wide) and in `assets/css/styles.css` give that
card a `--logo` value, e.g.

    .brands__item--daikin{--logo:url("../img/brands/daikin.svg")}

then add the `brands__item--logo` class next to `brands__item` in
`index.html` on that card. The wordmark stays in the markup for screen
readers and search engines; the class only moves it out of sight so the logo
has the card to itself.

Logos are drawn at 42% of the card height and centred, so supply artwork with
the brand's own padding trimmed off.

Note: these are third-party trademarks shown to state which equipment is
serviced. Keep each logo in its correct proportions and original colours, do
not recolour or restyle them, and drop any brand the business does not
actually work on.

## How It Works step photographs — in use

These four are live. The card slot is 4:3 to match the supplied files, so
nothing is cropped. Replace a file in place (same name, same 4:3 crop) to
change a step; the illustration under `assets/media/steps/` stays as the
fallback if a photo ever fails to load.

| File                 | CSS slot                     | Subject                        |
| -------------------- | ---------------------------- | ------------------------------ |
| `step-contact.webp`  | `.flowcard__media--contact`  | Phone showing the number       |
| `step-schedule.webp` | `.flowcard__media--schedule` | Desk calendar, date circled    |
| `step-onsite.webp`   | `.flowcard__media--onsite`   | Technician at the indoor unit  |
| `step-comfort.webp`  | `.flowcard__media--comfort`  | Family in a cooled living room |

## About Us photograph — in use

`about.webp` (1448x1086) fills `.aboutus__photo`. It renders at up to about
710 CSS px, so the file has enough resolution for a 2x screen. The
`interior.svg` illustration stays as the fallback.

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
