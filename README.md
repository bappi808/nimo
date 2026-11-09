# NIMO website redesign — version 1

A premium, mobile-responsive Next.js website starter for NIMO, flagship consumer brand of MAAK FOOD.

## Included
- Home page, Product Catalogue (14 products), individual product pages, About, Export, Contact.
- Official NIMO logo supplied by the owner (art preserved; white outer margins trimmed).
- Interactive product category filters.
- Business inquiry form opens the visitor's email application with a prefilled email to `maakfood22@gmail.com`. **This is NOT a working server-side lead capture system.**
- Responsive design and basic SEO metadata.

## IMPORTANT: Product-image migration before switching domain
Product photos are currently referenced by absolute URLs such as `https://www.nimofood.com/products/cutouts/special-toast-300g.webp` because direct asset download was not possible in the authoring environment. These photos will load on a Vercel test subdomain while the existing nimofood.com website is still live.

**Before pointing nimofood.com to the new website,** copy the 14 original images from the existing site into this project's `public/products/cutouts/` folder, preserving filenames (listed in `data/products.js`), and change `IMAGE_BASE` from `'https://www.nimofood.com'` to `''` in `data/products.js`. Otherwise product images may stop appearing when the old site is replaced. Confirm you control the product-image rights.

## Deploy without coding — GitHub website method
1. Unzip this project on your laptop.
2. Open your GitHub repository in your browser. Choose **Add file → Upload files**. Drag in the **contents** of the `nimo-v1` folder (not the ZIP), and commit the changes. If browser upload doesn't preserve the nested directories in your browser, GitHub Desktop is a better way to upload folders.
3. Go to Vercel > Add New > Project. Select the repository and click **Import**.
4. Framework should auto-detect as **Next.js**. Click **Deploy**. Initial deployment may take a few minutes.
5. Test with the `*.vercel.app` preview URL. Do not change DNS or attach the real domain before checking the site and migrating all images.

## Local development (optional)
- Install Node.js 20+.
- Run `npm install` then `npm run dev`.
- Open `http://localhost:3000`.

## Before production
- Verify current product catalogue, email and all copy.
- Move product images locally as described above, and check permission/licensing.
- Replace mailto inquiry with a secure form endpoint, anti-spam and email notifications (e.g. Supabase + server-side handler).
- Add privacy policy, proper form consent, business contact details, required regulatory disclosures.
- Get legal/regulatory approval for any proposed certification or quality claims; none are asserted in this starter.
- Add an admin CMS once the design and requirements are approved.
- Set up a secure DNS changeover with rollback plan and check current hosting/email records before changes.

## Public-source review
Product names, pack sizes, categories and the existing public business email were referenced from the live nimofood.com website on 2026-11-09. This is an independently created redesign starter, not a clone of the source code.
