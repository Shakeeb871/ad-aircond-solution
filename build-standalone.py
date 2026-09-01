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
styles = re.sub(r'url\("\.\./media/([^"]+)"\)',
                lambda m: 'url("' + data_uri(f"assets/media/{m.group(1)}", 'image/svg+xml') + '")',
                read('assets/css/styles.css'))

html = html.replace(
    '<link rel="preload" href="assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>\n'
    '<link rel="preload" href="assets/fonts/poppins-600-latin.woff2" as="font" type="font/woff2" crossorigin>\n'
    '<link rel="stylesheet" href="assets/css/fonts.css">\n'
    '<link rel="stylesheet" href="assets/css/styles.css">',
    '<style>\n' + fonts + '\n' + styles + '\n</style>')
html = html.replace('<script src="assets/js/main.js" defer></script>',
                    '<script>\n' + read('assets/js/main.js') + '\n</script>')
html = html.replace('<link rel="icon" href="favicon.svg" type="image/svg+xml">',
                    '<link rel="icon" href="' + data_uri('favicon.svg', 'image/svg+xml') + '" type="image/svg+xml">')

# Refuse to ship a file that still depends on something outside itself.
external = re.findall(r'(?:src|href)="(?!#|data:|https?://|tel:|mailto:)([^"]+)"', html)
if external:
    raise SystemExit(f"standalone.html would still reference: {external}")

with open(os.path.join(ROOT, 'standalone.html'), 'w', encoding='utf-8') as fh:
    fh.write(html)
print(f"standalone.html: {os.path.getsize(os.path.join(ROOT, 'standalone.html')) // 1024} KB, no external references")
