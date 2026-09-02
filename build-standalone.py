#!/usr/bin/env python3
"""Build standalone.html: the whole site in one file.

Everything the page needs — stylesheet, script, fonts, artwork, favicon — is
embedded, so the file works with no assets folder, no server and no correct
paths. Open it by double-clicking, or upload it on its own as index.html.

Run after changing index.html, the CSS, the JS or the artwork:

    python3 build-standalone.py
"""
import base64
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))


def data_uri(rel_path, mime):
    with open(os.path.join(ROOT, rel_path), 'rb') as fh:
        return f"data:{mime};base64," + base64.b64encode(fh.read()).decode()


def read(rel_path):
    with open(os.path.join(ROOT, rel_path), encoding='utf-8') as fh:
        return fh.read()


html = read('index.html')
fonts = re.sub(r"url\('\.\./fonts/([^']+)'\)",
               lambda m: "url('" + data_uri(f"assets/fonts/{m.group(1)}", 'font/woff2') + "')",
               read('assets/css/fonts.css'))
styles = read('assets/css/styles.css')
# Comments can name files that do not exist (they document optional slots), so
# drop them before anything tries to resolve a URL inside one.
styles = re.sub(r'/\*.*?\*/', '', styles, flags=re.S)
styles = re.sub(r'url\("\.\./media/([^"]+)"\)',
                lambda m: 'url("' + data_uri(f"assets/media/{m.group(1)}", 'image/svg+xml') + '")',
                styles)
styles = re.sub(r'url\("\.\./img/([^"]+)"\)',
                lambda m: 'url("' + data_uri(f"assets/img/{m.group(1)}", 'image/webp') + '")',
                styles)

# Asset URLs carry a ?v= build id, so match them by pattern rather than literally.
html = re.sub(r'<link rel="preload"[^>]*>\n', '', html)
_style_block = '<style>\n' + fonts + '\n' + styles + '\n</style>'
html = re.sub(r'<link rel="stylesheet" href="/assets/css/fonts\.css[^"]*">\n<link rel="stylesheet" href="/assets/css/styles\.css[^"]*">',
              lambda m: _style_block, html, count=1)
html = re.sub(r'<script src="/assets/js/main\.js[^"]*"[^>]*></script>',
              lambda m: '<script>\n' + read('assets/js/main.js') + '\n</script>', html, count=1)
# The root icon files and the manifest cannot travel with a single file, so the
# standalone copy carries one inlined PNG icon instead.
html = re.sub(r'<link rel="(?:icon|apple-touch-icon|manifest)"[^>]*>\n?', '', html, count=5)
html = html.replace('<meta name="theme-color"',
                    '<link rel="icon" href="' + data_uri('favicon-32.png', 'image/png')
                    + '" type="image/png" sizes="32x32">\n<meta name="theme-color"', 1)

# <img> artwork referenced straight from the markup (the logo).
MIME = {'.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon'}
html = re.sub(r'src="/assets/img/([^"?]+)(\?[^"]*)?"',
              lambda m: 'src="' + data_uri('assets/img/' + m.group(1),
                                           MIME[os.path.splitext(m.group(1))[1].lower()]) + '"',
              html)

# Refuse to ship a file that still depends on an asset outside itself —
# attributes and CSS url() alike.
#
# Links to the site's own pages are the one exception: the nav and footer point
# at about.html, the service pages and so on. standalone.html is a single-file
# copy of the HOMEPAGE for handing over or opening from disk; those links only
# resolve when the real site is deployed alongside it.
# the site's own pages are directory URLs now: /, /about/, /#process
site_pages = re.compile(r'^/([a-z0-9-]+/)?(#.*)?$')
external = [h for h in re.findall(r'(?:src|href)="(?!#|data:|https?://|tel:|mailto:)([^"]+)"', html)
            if not site_pages.match(h)]
external += re.findall(r'url\(["\']?(?!#|data:|https?://)([^"\')]+)', html)
if external:
    raise SystemExit(f"standalone.html would still reference: {external}")

with open(os.path.join(ROOT, 'standalone.html'), 'w', encoding='utf-8') as fh:
    fh.write(html)
print(f"standalone.html: {os.path.getsize(os.path.join(ROOT, 'standalone.html')) // 1024} KB, no external references")
