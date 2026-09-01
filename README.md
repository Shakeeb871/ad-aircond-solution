# Ad Aircond Solution — Website

Homepage for **Ad Aircond Solution**, an air conditioning repair, servicing, maintenance and
installation company in Kuala Lumpur.

- **Phone:** +60 17-857 0744
- **Address:** 14, Jalan Batu Bata, Titiwangsa Central, 50400 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur

## Running it

It is a static site with no build step. Open `index.html`, or serve the folder:

```bash
npx http-server -p 8080 .
# then visit http://127.0.0.1:8080
```

Deploy by uploading the folder to any static host (Netlify, Vercel, cPanel, S3, GitHub Pages).

## Structure

```
index.html              the whole page, including the inline SVG icon sprite
assets/css/styles.css   design tokens + all component styles
assets/css/fonts.css    self-hosted @font-face rules
assets/fonts/           Inter (variable) and Poppins woff2 subsets
assets/js/main.js       nav, submenu, scroll reveal, scroll spy, booking form
assets/media/           original SVG artwork used across the page
assets/img/             drop real photography here — see assets/img/README.md
favicon.svg
```

## Page sections

Header (solid white) → Hero → 3 service highlight cards → About → Promotional CTA band →
Trust strip → Aircond services bento grid → Approach (image + text) → Support cards →
Service packages → Process → Testimonials → Brand wall → Final CTA with booking form → Footer

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| `--b-500` | `#14bdb8` | primary turquoise |
| `--b-700` | `#0d818e` | links, eyebrows |
| `--b-950` | `#062733` | dark teal sections |
| `--ink` | `#0d2028` | headings |
| `--muted` | `#55727e` | body text |
| `--grad` | turquoise → cyan | primary buttons, accent cards |

Display type is Poppins, body type is Inter, both self-hosted so the page does not depend on a
third-party font request at render time.

The header is deliberately **solid white and never transparent** — it sits on its own surface and
the hero begins beneath it.

## Things to replace before launch

Three areas are intentionally marked as placeholder rather than filled with invented content.
Each is flagged with an HTML comment above it in `index.html`.

1. **Testimonials** — the three cards carry sample wording, no invented customer names, photos or
   star ratings. Swap in real, permission-granted reviews.
2. **Brand wall** — the brand names listed are a starting point, not a confirmed service list.
   Replace them with the brands Ad Aircond Solution actually services (and licensed logo files if
   you have them).
3. **Email address** — `hello@adaircondsolution.com` appears in the top bar and footer as a
   placeholder. Replace it with the real address, or remove those two links.

There are no invented statistics, certifications or prices anywhere on the page. Packages show
**Request Quote** rather than a figure, since pricing follows an on-site assessment.

## Booking form

The form in the final CTA section has no backend. On submit it composes the enquiry and opens
WhatsApp (`wa.me/60178570744`) with the message prefilled. Nothing is stored or transmitted by the
page itself. To move to a server-side form later, replace the `submit` handler in
`assets/js/main.js`.

## SEO

Title, meta description, canonical, Open Graph tags and `HVACBusiness` JSON-LD structured data
(real address, phone and service list) are in the `<head>` and at the end of `<body>`. Update the
canonical URL and `og:url` once the live domain is known.
