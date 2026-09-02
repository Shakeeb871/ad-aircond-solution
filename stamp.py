#!/usr/bin/env python3
"""Stamp the build id into index.html and onto every asset URL.

The stylesheet and script keep their filenames, so a browser that cached an
earlier copy will keep serving it — that is how a new index.html ended up
paired with an old styles.css. Appending the build id makes each release a
different URL, which no cache can match against the old one.

Run after any change to the CSS or JS, then rebuild standalone.html:

    python3 stamp.py && python3 build-standalone.py
"""
import os
import re
import subprocess
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.abspath(__file__))
sha = subprocess.run(['git', 'rev-parse', '--short', 'HEAD'],
                     cwd=ROOT, capture_output=True, text=True).stdout.strip() or 'dev'
date = datetime.now(timezone.utc).strftime('%Y-%m-%d')
build = f"{date}-{sha}"

path = os.path.join(ROOT, 'index.html')
with open(path, encoding='utf-8') as fh:
    html = fh.read()

html = re.sub(r'<!-- BUILD [^>]*-->\n', '', html)
html = html.replace('<!DOCTYPE html>\n',
                    f'<!DOCTYPE html>\n<!-- BUILD {build} · hero: light two-column with wave -->\n')
html = re.sub(r'<meta name="build" content="[^"]*">', f'<meta name="build" content="{build}">', html)

# every local asset carries the build id, so a cached copy of an older
# release can never be served against newer markup
def version(match):
    attr, url = match.group(1), match.group(2).split('?')[0]
    return f'{attr}="{url}?v={build}"'

html = re.sub(r'(href|src)="(/assets/(?:css|js)/[^"?]+)(?:\?[^"]*)?"', version, html)

with open(path, 'w', encoding='utf-8') as fh:
    fh.write(html)

print(f"build {build}")
for line in html.splitlines():
    if '/assets/css' in line or '/assets/js' in line:
        print(" ", line.strip())
