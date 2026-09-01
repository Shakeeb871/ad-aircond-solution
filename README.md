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


## Automatic deploys (set this up once)

Goal: push to `main`, the live site updates itself. Nothing to upload by hand.

One thing to know first: **cPanel's Git Version Control does not deploy on push by its own.**
It clones the repo and can run `.cpanel.yml`, but something has to tell it to. The options below
differ only in what does the telling.

### Option A — cPanel Git Version Control, triggered by GitHub Actions (active setup)

Needs SSH access on the hosting account. Deploys within seconds of a push.

**1. Create the repository in cPanel**

cPanel → **Git™ Version Control → Create**:

| Field | Value |
| --- | --- |
| Clone URL | `https://github.com/Shakeeb871/ad-aircond-solution.git` |
| Repository Path | `/home/<cpanel-user>/repositories/ad-aircond-solution` |
| Branch | `main` |

The repository is public, so cPanel needs no GitHub credentials to clone it.

**2. Create an SSH key**

cPanel → **SSH Access → Manage SSH Keys → Generate a New Key**. Then **Authorize** the public key
— an unauthorized key is the most common reason this fails. Copy the **private** key.

**3. Add the GitHub secrets**

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `CPANEL_SSH_HOST` | server host name or IP |
| `CPANEL_SSH_USER` | your cPanel username |
| `CPANEL_SSH_KEY` | the whole private key, `BEGIN`/`END` lines included |
| `CPANEL_REPO_PATH` | `/home/<cpanel-user>/repositories/ad-aircond-solution` |
| `CPANEL_SSH_PORT` | only if the host does not use port 22 |

**4. Push**

`.github/workflows/deploy-cpanel-git.yml` then fetches the commit on the server, resets the
checkout to match GitHub exactly, and runs the `.cpanel.yml` deployment. Watch it under the
**Actions** tab.

### Option B — cPanel Git Version Control, triggered by cron

No SSH from outside, no GitHub secrets. The trade-off is a delay of up to five minutes.

cPanel → **Cron Jobs**, every five minutes:

```
*/5 * * * * cd $HOME/repositories/ad-aircond-solution && /usr/local/cpanel/3rdparty/bin/git fetch -q origin main && /usr/local/cpanel/3rdparty/bin/git reset -q --hard origin/main && /usr/local/bin/uapi VersionControlDeployment create repository_root=$HOME/repositories/ad-aircond-solution >/dev/null 2>&1
```

Check the git and uapi paths against your host — they vary between cPanel builds.

### Option C — FTP, no cPanel Git at all

`.github/workflows/deploy.yml` uploads over FTPS. It works on any host, including ones with no
SSH and no Git Version Control. It is set to **manual** (Actions → Run workflow) so it cannot
clash with Option A; to make it the automatic one, uncomment its `push:` block and comment out
the `on: push:` block in `deploy-cpanel-git.yml`.

Its secrets:

| Secret | Example |
| --- | --- |
| `FTP_HOST` | `ftp.adaircondsolution.com` (no `ftp://`) |
| `FTP_USER` | the FTP username |
| `FTP_PASSWORD` | the FTP password |
| `FTP_DIR` | `/public_html` |

Only ever leave **one** workflow on `push`. Two would deploy the same files twice.

### What `.cpanel.yml` does

It copies `index.html`, `favicon.svg`, `.htaccess` and the whole `assets/` folder into
`$HOME/public_html`, replacing `assets/` wholesale so files deleted from the repo also disappear
from the server. For an addon domain or subdomain, change `DEPLOYPATH` at the top of the file.

### After deploying

Refresh with Ctrl+Shift+R. `.htaccess` sets a one-year cache on CSS, JS and images, so a normal
refresh can still show the old version.

### Alternative: Netlify, Vercel or Cloudflare Pages

If the site is ever moved off cPanel, these are simpler than either option above — connect the
repository, leave the build command empty, set the publish directory to `.`, and delete both
workflow files. Free SSL, a CDN, atomic deploys and one-click rollback, with no secrets to manage.


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
