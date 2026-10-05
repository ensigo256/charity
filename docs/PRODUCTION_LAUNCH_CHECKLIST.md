# Production launch checklist

## 1. Site verification
- Confirm the production domain is `https://ensigoflove.org`
- Confirm the canonical URLs match the live site
- Confirm `robots.txt` and `sitemap.xml` resolve correctly on the production domain
- Verify homepage, donation, programs, about, and contact pages all load without errors

## 2. SEO and search visibility
- Submit the production sitemap to Google Search Console
- Verify the domain in Search Console
- Check that the homepage includes both brand names: `Seeds of Love` and `Ensigo of Love`
- Confirm metadata and social preview cards display correctly in a browser preview or Search Console
- Review title and meta descriptions for clarity and keyword relevance

## 3. Analytics and tracking
- Add the real Google Analytics measurement ID to `NEXT_PUBLIC_GA_ID`
- Confirm the Google tag loads in the production environment
- Check that page views are recorded after deployment
- Add event tracking later for donation clicks, sponsored profile clicks, and newsletter signups

## 4. Trust and conversion checks
- Confirm donation and sponsor links work on live production
- Confirm contact form submits successfully in the deployed environment
- Check newsletter signup flow in live production
- Ensure all social links are valid and point to the correct profiles

## 5. Deployment safety
- Use production environment variables only
- Confirm no private keys are committed to the repo
- Test the deploy on the live domain before announcing public launch
- Keep a rollback step ready in case of deployment issues

## 6. Final launch sign-off
- Review homepage messaging and branding
- Review all public pages for consistency and accuracy
- Confirm the donation journey is user-friendly and secure
- Confirm the site is ready for public outreach, social sharing, and search discovery

## Environment values to set
- `NEXT_PUBLIC_SITE_URL`: production domain
- `NEXT_PUBLIC_GA_ID`: Google Analytics measurement ID
- Social URLs: official public profiles for Facebook, X/Twitter, Instagram, and LinkedIn
