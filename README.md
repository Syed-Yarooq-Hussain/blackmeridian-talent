# Black Meridian Management

Separate talent-management website. No Sales & Consulting source was modified.

## Run

`npm install`, then `npm run dev`. Production: `npm run build`. Browser checks: `npm test` with the development server running on port 5173.

## Client setup before public launch

- Confirm legal business identity, address and privacy text. The legal dialogs currently identify this as a private development preview.
- Supply the management inbox and a form processing endpoint in `public/config.json`. Form delivery deliberately does not claim success until the endpoint returns a successful response. A production endpoint must enforce server validation, consent, rate limits, spam protection, and delivery retries. The frontend sends JSON with formType and language. No email secrets belong in this public file.
- Set the real GitHub repository in `public/admin/config.yml`, configure Decap CMS OAuth on your chosen host, and restrict repository access to editors. `/admin/` provides the content editing interface after that authentication setup. Do not enable unauthenticated writes. Rebuild on content commits.
- Add approved talent details and photos in the CMS. Only `published: true` entries appear. The empty directory is intentional, not a fabricated roster.
- Have native speakers review the machine-assisted translations before launch. Twelve complete locale files are included; German is the source copy.

## Design and references

Palette derived from the supplied Black Meridian PDF: eggshell `#eee9df`, near-black `#20211f`, burgundy `#4b1024`. Locally hosted Manrope and Cormorant Garamond; serif display headlines and restrained editorial layouts. LYN informs the photography-first structure, service discovery and distinct talent/brand inquiry paths: https://lyntheagency.de/. The Digital Dept reference could not be retrieved during research.

Photography is illustrative, with an explicit non-representation caption:

- Chris Robert, tennis: https://unsplash.com/photos/mmi0vkwHU0M
- Kamilla Isalieva, photography: https://unsplash.com/photos/0D6ZJKOm25w
- License: https://unsplash.com/license — free commercial use under the Unsplash license. No AI-generated imagery is used. Final brand use should retain the non-endorsement context and be reviewed with client-approved assets.

Additional football, athletics, boxing and production photography should use client-approved originals; the initial layout prioritizes a balanced tennis/creator pair rather than unverified roster imagery.

## Implemented

Responsive homepage and anchored sections; four expandable services; two talent category filters; data-driven profiles with selected-talent inquiries; two validated forms; consent and honeypot; twelve persistent language choices; legal/credit dialogs; reduced-motion support; local fonts/images; private preview preparation.

## Limitations

Live delivery, authenticated CMS login, legal compliance text, verified roster and native-language signoff require the client configuration above. This static preview is not a production contact backend.
