# SSL and the canonical domain

The site's own address is **https://adaircondsolution.com** with no `www`.
Every canonical tag, Open Graph URL, sitemap entry and robots line already
uses that form, and `htaccess.conf` redirects everything else to it.

## 1. Issue the certificate first

The redirects in `htaccess.conf` force https. Turn the certificate on before
deploying them, or the site will redirect visitors to an address the server
cannot yet serve.

In cPanel:

1. **Security → SSL/TLS Status**
2. Tick `adaircondsolution.com` and `www.adaircondsolution.com`
3. **Run AutoSSL**
4. Wait for both rows to show a valid certificate

AutoSSL uses Let's Encrypt or Sectigo depending on the host, and it renews on
its own. If AutoSSL is not available on the account, **Security → SSL/TLS →
Manage SSL sites** takes a certificate pasted in by hand.

`www` needs the certificate too. Without it, anyone who types `www.` gets a
browser warning before the redirect can move them to the apex domain.

## 2. Then deploy

Push to the branch cPanel watches, or press **Deploy HEAD Commit** in
**Git Version Control**. That copies `deploy/htaccess.conf` to the docroot as
`.htaccess`.

## 3. Check it worked

Each of these should end at `https://adaircondsolution.com/ac-repair/` with a
single 301, and the last one with two:

    curl -sI http://adaircondsolution.com/ac-repair/      | head -2
    curl -sI https://www.adaircondsolution.com/ac-repair/ | head -2
    curl -sI http://www.adaircondsolution.com/ac-repair/  | head -2
    curl -sI https://adaircondsolution.com/ac-repair.html | head -2

And the certificate itself:

    curl -sI https://adaircondsolution.com/ | head -1
    openssl s_client -connect adaircondsolution.com:443 -servername adaircondsolution.com </dev/null 2>/dev/null | openssl x509 -noout -dates

## 4. Google Search Console

Add the property as **https://adaircondsolution.com** and submit
`https://adaircondsolution.com/sitemap.xml`. A Domain property covers every
variant at once and is the simpler choice if DNS access is available.

## What the rules do

`htaccess.conf` sends any request that is not https, or arrives on a `www`
host, to `https://adaircondsolution.com` with a 301. Both rules skip
`/.well-known/`, because AutoSSL and Let's Encrypt fetch the renewal challenge
over plain HTTP and a redirect there can fail the renewal.

HSTS is set to one year, and only on responses that already came over https,
so it cannot lock anyone out while a certificate is pending. It carries no
`preload` and no `includeSubDomains`, which keeps it reversible.
