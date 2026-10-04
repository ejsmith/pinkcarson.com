# Pink Carson

Carson’s personal grooming portfolio, built with TypeScript and Vite. A pink theme, real grooming photos, and a little about her life with animals.

## Development

Requires Node 22.12+ and npm.

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

```powershell
npm test
npm run build
npm run preview
```

`npm start` is an optional static server for the production build; its default port is 3000, configurable with `PORT`. No application server is needed in production.

## GitHub Pages

Repository: [ejsmith/pinkcarson.com](https://github.com/ejsmith/pinkcarson.com).

Pushing to `main` runs the contact tests, checks TypeScript, builds the site, and deploys `dist/` through GitHub Actions. The Pages publishing source must be **GitHub Actions**. The workflow reads the correct asset base path from GitHub Pages, supporting both the default project URL and the custom domain.

Initial Pages address: https://ericjsmith.dev/pinkcarson.com/ (inherited from the account’s existing Pages domain until `pinkcarson.com` is connected).

To connect **pinkcarson.com**:

1. Set `pinkcarson.com` as the custom domain in [Settings → Pages](https://github.com/ejsmith/pinkcarson.com/settings/pages) before pointing DNS at GitHub.
2. Add these DNS records at the domain’s DNS provider (DNSimple). `@` means the root domain; leave the name blank if the provider uses a blank root name.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ejsmith.github.io |

3. Rerun **Deploy GitHub Pages** to rebuild for the domain’s root path. Once GitHub issues the certificate, enable **Enforce HTTPS** and verify both the root domain and `www` redirect.

See [GitHub’s custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). DNS is managed separately from this repository. With an Actions deployment, a `CNAME` file is not required.

## Contact form

The form uses [Web3Forms](https://web3forms.com) directly from the browser. The receiving email stays in the Web3Forms dashboard. The only value included in the site is the public form access key.

1. Create a free form at https://app.web3forms.com and verify the receiving email.
2. In that form’s spam settings, **enable hCaptcha** so the provider enforces verification on submissions. The site uses Web3Forms’ documented shared hCaptcha site key; no separate hCaptcha account is needed.
3. Set the GitHub repository **Actions variable** `WEB3FORMS_ACCESS_KEY` to the form’s public Access Key. Use Settings → Secrets and variables → Actions → Variables, or:

```powershell
gh variable set WEB3FORMS_ACCESS_KEY --repo ejsmith/pinkcarson.com
```

4. Rerun **Deploy GitHub Pages**. For local development, set `VITE_WEB3FORMS_ACCESS_KEY` in `.env`, then restart Vite or rebuild.
5. Send a real test from the deployed page and confirm receipt in the destination inbox. The automated tests mock the provider and never send emails.

The submit button remains disabled without configuration or a completed captcha. Network failures, quota limits, and provider rejections preserve the visitor’s note and show a useful status; the form clears only when Web3Forms explicitly confirms success. The visitor’s email is used as Reply-To. Review retention and notification settings in the provider dashboard.

The free plan currently allows 250 submissions per month. Monitor its usage in Web3Forms; the site cannot accept messages if that allowance is exhausted. See [pricing](https://web3forms.com/pricing) and [hCaptcha setup](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha).

## Content and photos

- Profile, experience, award, grooming gallery, and personal photos: `src/content.ts`.
- Page copy and interactions: `src/main.ts`.
- Theme and responsive layout: `src/style.css`.
- Decorative corgi illustration: `src/illustrations.ts`.
- Public optimized photographs: `public/images/`.

Originals remain local in the ignored `assets/photos/` directory. Run `npm run images` where those originals are available to generate 640px and 1280px WebP copies. The script applies camera orientation and strips camera/GPS metadata without retouching the photos. GitHub builds use the already-generated web images and do not require originals.

Six grooming photos appear initially; **Show more grooms** reveals the next six. Photographs open in a keyboard-accessible viewer with previous/next navigation and Escape to close. The Groom Texas award portrait retains its full composition and photographer credit.

Search indexing remains disabled with `noindex, nofollow` while the content is being reviewed. Remove that directive in `index.html` when ready for search engines.
