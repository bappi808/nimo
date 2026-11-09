# NIMO — Production launch checklist

This is the NIMO flagship-brand website of MAAK FOOD. Repository: bappi808/nimo. Hosting: Vercel. The old public site still serves www.nimofood.com.

IMPORTANT: Do not move the official DNS until every launch gate is checked. Never commit secrets to GitHub.

## Already prepared
- [x] Premium Home, Products, Product Detail, About, Export and Contact designs.
- [x] All 14 genuine original WebP product pack images imported into public/products/cutouts/ and switched to local paths.
- [x] Server-side business inquiry endpoint with Resend + Cloudflare Turnstile, disabled until configured.
- [x] Server validation, bot honeypot, content-length protection, security headers, branded error and 404 pages.
- [x] Sitemap, controlled SEO indexing, social metadata, initial privacy notice.
- [x] Automated GitHub Next.js build checks.

## Gate A: Owner review
- [ ] View each pack photo at desktop and mobile size; confirm real packaging, legibility and image quality.
- [ ] Confirm all 14 product descriptions and pack sizes.
- [ ] Confirm receiving email maakfood22@gmail.com is correct.
- [ ] Review and approve public privacy notice and quality/company claims.

## Gate B: Direct business inquiry form
Create a Resend account and verify the sending domain. Create a Cloudflare Turnstile site/key for the new Vercel preview and official domain. In Vercel Project Settings > Environment Variables, add these variables:

| Variable | Value |
| --- | --- |
| INQUIRY_FORM_ENABLED | true |
| NEXT_PUBLIC_INQUIRY_FORM_ENABLED | true |
| RESEND_API_KEY | Secret API key from Resend |
| CONTACT_FROM_EMAIL | Verified sender identity, e.g. NIMO <inquiries@VERIFIED-DOMAIN> |
| CONTACT_TO_EMAIL | Your verified receiving inbox, currently maakfood22@gmail.com |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Public Cloudflare Turnstile site key |
| TURNSTILE_SECRET_KEY | Secret Cloudflare Turnstile key |

Never share API keys or Turnstile secret in chat or commit to GitHub. Enter directly in Vercel's encrypted environment variable settings. Redeploy when values change.

Before launch: submit a real test inquiry; confirm email delivery/reply-to, validation, spam checks, errors and success message. Until enabled, the website honestly opens the visitor's email app instead of claiming it sent an inquiry.

## Gate C: Technical QA
- [ ] Confirm GitHub and Vercel production builds pass.
- [ ] Test all pages at mobile, tablet and desktop widths.
- [ ] Test product filters, product details, breadcrumb, related products and product preselection into contact.
- [ ] Confirm all images load from local /products/cutouts/ paths.
- [ ] Verify a real email submission and Turnstile on a permitted hostname.
- [ ] Run PageSpeed/Lighthouse mobile and accessibility checks.
- [ ] Confirm Privacy and 404 routes, navigation and keyboard interactions.

## Gate D: Official domain cutover — explicit approval required
1. Confirm domain registrar and current DNS provider; record existing web, MX and TXT records and rollback values.
2. Use a Vercel plan permitted for commercial operation.
3. Add nimofood.com and www.nimofood.com under Vercel > Project > Settings > Domains.
4. Update only Vercel-required web DNS records. Preserve mail settings (MX, SPF, DKIM, DMARC).
5. Set NEXT_PUBLIC_SITE_URL=https://www.nimofood.com and NEXT_PUBLIC_SITE_LAUNCHED=true in Vercel Production env, then redeploy.
6. Verify HTTPS, apex/www redirects, sitemap.xml, robots.txt, canonical metadata, product photos and test inquiry after cutover.
7. Monitor error logs and contact inquiries; use saved previous DNS values if rollback needed.

Notes: Image files are the real old-site WebP assets, but their visual quality still requires review; original high-resolution master images are preferred. The privacy notice is a first operational draft, not legal advice. This is a corporate/export B2B website, not an ecommerce payment system or content-managed admin portal.
