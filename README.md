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

## Getting it online the first time

The site is static, so there is nothing to build and no server-side runtime to install.

For the very first upload, cPanel → **File Manager** → `public_html`, upload the files (or a zip
of them) and extract. Check that `index.html` sits directly inside `public_html`, not in a nested
folder. Turn on File Manager → Settings → **Show Hidden Files** so `.htaccess` comes across too.
Then run cPanel → **SSL/TLS Status → Run AutoSSL** so the domain serves over HTTPS.

After that, set up automatic deploys below and you never upload by hand again.

### DNS

Point the domain at the host:

| Record | Name | Value |
| --- | --- | --- |
| `A` | `@` | your host's server IP |
| `CNAME` | `www` | your domain, or the target the host gives you |

DNS changes take anywhere from a few minutes to a few hours.

### Once the domain is live

Update three things in `index.html`:

1. `<link rel="canonical" href="https://adaircondsolution.com/">` → the real domain.
2. Add `<meta property="og:url" content="https://yourdomain.com/">` beside the other OG tags.
3. Replace the placeholder email `hello@adaircondsolution.com` in the top bar and footer.

Then submit the domain to Google Search Console and create a Google Business Profile with the
Titiwangsa Central address — for a local service business that drives more enquiries than anything
on the page itself.


## Getting the site onto the server

There are two ways. Neither needs Git installed on the hosting.

### Fastest: upload one file

`standalone.html` is the entire site in a single file — stylesheet, script, fonts, artwork and
favicon are all embedded. It needs no `assets` folder, no server and no correct paths.

cPanel → File Manager → `public_html` → upload it, rename it to `index.html`. Done.

Regenerate it after any change:

```bash
python3 build-standalone.py
```

### Automatic: push to main, FTPS uploads it

`.github/workflows/deploy.yml` runs on every push to `main`. One-time setup — take four values
from cPanel → **FTP Accounts**, then add them at GitHub → **Settings → Secrets and variables →
Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `FTP_HOST` | `ftp.yourdomain.com` — host only, no `ftp://` |
| `FTP_USER` | the FTP username |
| `FTP_PASSWORD` | the FTP password |
| `FTP_DIR` | `/public_html` |

Until all four exist the run stops on its first step and says which one is missing. Check the
repository's **Actions** tab: a green tick means it reached the server.

Notes:

- The upload uses FTPS. If the host has no FTPS the run fails with an SSL error — better to ask
  the host to enable it than to send the password in the clear, but the fallback is a one-line
  change in the workflow.
- `.git/`, `.github/` and the README files are excluded from the upload.
- Files deleted from the repo are not removed from the server by default. Once `FTP_DIR` is
  confirmed correct, uncomment the `--delete` line in the workflow.
- After a deploy, refresh with Ctrl+Shift+R — `.htaccess` caches CSS and images for a year, so a
  normal refresh can still show the old version.

### If the page looks unstyled

That means the CSS did not load: the `assets` folder is missing, or the zip was extracted into a
subfolder so `index.html` is not directly inside `public_html`. Upload `standalone.html` instead —
it cannot fail that way.


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

Header (solid white) → Hero (headline, CTAs, request card, 3 USP cards) → About →
Promotional CTA band → Trust strip → Aircond services bento grid → Approach (image + text) →
Support cards → Service packages → Process → Testimonials → Brand wall →
Final CTA with booking form → Footer

The hero uses a two-column composition: messaging on the left, the service image on the right, a
floating **Request AC Service** card overlapping it, and three USP cards (Trusted Technicians,
Fast Response, Quality Workmanship) sitting beside the form. A full-width wave carries the hero
into the white section below, and the cards straddle that curve so the boundary reads as depth
rather than a seam.

Above the cards sits a lightweight trust strip (Trusted Technicians, Fast Response, Quality
Assured) divided by hairlines. Note that it repeats two of the three card headings — that is
deliberate, per the brief, not an oversight.

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
the hero begins beneath it. The active nav item carries a turquoise underline on desktop and a
tinted pill in the stacked mobile panel.

Below 1180px the navigation becomes a slide-in panel; between 1180 and 1240 the phone CTA keeps
its icon and drops the number so the seven nav items still fit.

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

## Enquiry forms

Two forms share one handler: the **Request AC Service** card in the hero and the booking form in
the final CTA section. Neither has a backend. On submit the details are composed into a WhatsApp
message and `wa.me/60178570744` opens with it prefilled — nothing is stored or transmitted by the
page itself.

Any form carrying `data-wa-form` is picked up automatically. `name` and `phone` are required;
`service`, `area` and `message` are included when present. To move to a server-side form later,
replace the single `submit` handler in `assets/js/main.js`.

## SEO

Title, meta description, canonical, Open Graph tags and `HVACBusiness` JSON-LD structured data
(real address, phone and service list) are in the `<head>` and at the end of `<body>`. Update the
canonical URL and `og:url` once the live domain is known.
