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

## Deploying to hosting

The site is static, so "deploying" means copying the files. There is nothing to build and no
server-side runtime to install.

### cPanel / shared hosting (most Malaysian hosts)

1. In cPanel open **File Manager** and go to `public_html`.
2. Upload `ad-aircond-solution-site.zip` (or the individual files) into `public_html`.
3. Right-click the zip and choose **Extract**, then delete the zip.
4. Check that `index.html` sits directly inside `public_html` — not inside a nested folder.
   The structure should read `public_html/index.html`, `public_html/assets/...`.
5. Make sure hidden files are visible (File Manager → Settings → Show Hidden Files) so
   `.htaccess` uploads too. It is optional but adds gzip and caching.
6. In cPanel run **SSL/TLS Status → Run AutoSSL** so the domain serves over HTTPS.

FTP works the same way: connect with FileZilla and drop the contents of this folder into
`public_html`.

### GitHub Pages

The repository is already on GitHub, so this needs no upload:

1. Repository → **Settings → Pages**.
2. Source: **Deploy from a branch**, branch `main` (or whichever branch holds the site), folder `/ (root)`.
3. Save. The site appears at `https://<user>.github.io/<repo>/` in a minute or two.
4. For a custom domain, add it under Pages → Custom domain and point a `CNAME` record at
   `<user>.github.io`.

### Netlify / Vercel / Cloudflare Pages

Connect the repository, then:

- Build command: **leave empty**
- Publish directory: **`.`** (the repository root)

Every push to the connected branch redeploys automatically.

### DNS

Point the domain at the host:

| Record | Name | Value |
| --- | --- | --- |
| `A` | `@` | your host's server IP |
| `CNAME` | `www` | your domain (or the host's given target) |

DNS changes take anywhere from a few minutes to a few hours to take effect.

### After the domain is live

Update these three things in `index.html`:

1. `<link rel="canonical" href="https://adaircondsolution.com/">` → the real domain.
2. Add `<meta property="og:url" content="https://yourdomain.com/">` next to the other OG tags.
3. Replace the placeholder email `hello@adaircondsolution.com` in the top bar and footer.

Then submit the domain to Google Search Console and create a Google Business Profile with the
Titiwangsa Central address — for a local service business that drives more enquiries than anything
on the page itself.


## Automatic deploys (set this up once)

`.github/workflows/deploy.yml` uploads the site to hosting on every push to `main`. Once the four
secrets below exist, no upload is ever manual again — a push goes live in about a minute.

### 1. Get the FTP details

cPanel → **FTP Accounts**. You need the host, username, password and the folder the site is served
from (almost always `/public_html`).

### 2. Add them as GitHub secrets

Repo → **Settings → Secrets and variables → Actions → New repository secret**. Add four:

| Secret | Example | Notes |
| --- | --- | --- |
| `FTP_HOST` | `ftp.adaircondsolution.com` | host name only, no `ftp://` |
| `FTP_USER` | `deploy@adaircondsolution.com` | the FTP username |
| `FTP_PASSWORD` | | never commit this to the repo |
| `FTP_DIR` | `/public_html` | folder the domain serves from |

Secrets are write-only — GitHub will not show them again, and they never appear in the build logs.

### 3. Push

Push to `main`. Watch it under the **Actions** tab. Green tick means it is live; refresh the site
with Ctrl+Shift+R to get past the browser cache.

### Notes

- The workflow uses **FTPS** (encrypted). If the host does not support it, the run fails with an
  SSL error — set `ftp:ssl-force` to `false` in the workflow, though it is better to ask the host
  to turn FTPS on, since plain FTP sends the password in the clear.
- `.git/`, `.github/` and the README files are excluded from the upload.
- Files deleted from the repo are **not** removed from the server by default. Once you have
  confirmed `FTP_DIR` is correct, uncomment the `--delete` line in the workflow to keep the server
  an exact mirror.
- `workflow_dispatch` is enabled, so you can also re-deploy by hand from the Actions tab without
  pushing anything.

### Alternative: Netlify, Vercel or Cloudflare Pages

If the site is not tied to existing hosting, these are simpler than FTP — connect the repository,
leave the build command empty, set the publish directory to `.`, and delete
`.github/workflows/deploy.yml`. You get free SSL, a CDN, atomic deploys and instant rollback, and
every push deploys automatically with no secrets to manage.


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
