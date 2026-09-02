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

## Service card photographs (optional)

The six Our Services cards ship with hand-drawn illustrations that always
render, so the section is complete as-is. To use photographs instead, drop
files here and point the matching slot at them in `assets/css/styles.css`
(section 12, "Services"):

| File to add            | CSS slot to edit                 |
| ---------------------- | -------------------------------- |
| `svc-repair.webp`      | `.svc__media--repair`            |
| `svc-cleaning.webp`    | `.svc__media--cleaning`          |
| `svc-installation.webp`| `.svc__media--installation`      |
| `svc-maintenance.webp` | `.svc__media--maintenance`       |
| `svc-gas.webp`         | `.svc__media--gas`               |
| `svc-electrical.webp`  | `.svc__media--electrical`        |

Each slot is a one-line change, e.g.

    .svc__media--repair{--photo:url("../img/svc-repair.webp"); ...}

The illustration stays underneath as the fallback, so a missing or slow
photo never leaves an empty card.

**Shoot/crop notes** — 16:10 landscape, at least 960x600, subject centred
and slightly high in the frame (the circular icon badge overlaps the bottom
edge of the image). Keep the lower third calm: no faces or text there.

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
