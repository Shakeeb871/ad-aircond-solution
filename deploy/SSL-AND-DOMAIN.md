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

## "Not secure" in the browser

That message means the browser did not get a valid certificate for
`adaircondsolution.com`. It is a server-side state, not a page problem. The
site's own files reference no `http://` resource anywhere, so mixed content is
ruled out.

Work through these in order:

1. **cPanel → Security → SSL/TLS Status.** Does `adaircondsolution.com` show a
   valid certificate, or does it say "AutoSSL Domain Validated" / nothing at
   all? If there is no certificate, tick both the domain and `www` and press
   **Run AutoSSL**. Issue usually completes within minutes.
2. **Certificate on the wrong name.** A padlock warning naming a different host
   means the server answered with its own shared certificate. The domain has no
   certificate of its own yet, so the answer is the same: run AutoSSL.
3. **`www` missing from the certificate.** If the apex works but `www` warns,
   AutoSSL covered one name and not the other. Re-run it with both ticked.
4. **DNS not pointing here yet.** AutoSSL validates by fetching a token over
   HTTP, so it fails while the A record still points at the old host. Check the
   A record resolves to this server before re-running.
5. **cPanel's own "Force HTTPS Redirect".** Leave that switch **off**.
   `htaccess.conf` already does the redirect, and running both can produce a
   redirect loop.

If the certificate cannot be issued today and the site has to stay reachable,
comment out the four "force https" lines in `htaccess.conf`, deploy, and put
them back once AutoSSL succeeds. The file marks exactly which lines those are.

## What the rules do

`htaccess.conf` sends any request that is not https, or arrives on a `www`
host, to `https://adaircondsolution.com` with a 301. Both rules skip
`/.well-known/`, because AutoSSL and Let's Encrypt fetch the renewal challenge
over plain HTTP and a redirect there can fail the renewal.

HSTS is set to one year, and only on responses that already came over https,
so it cannot lock anyone out while a certificate is pending. It carries no
`preload` and no `includeSubDomains`, which keeps it reversible.
