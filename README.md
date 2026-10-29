# Agent Name Service website

The ANS project website, built with Astro and deployed as static HTML to GitHub Pages.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci --ignore-scripts
npm run dev
```

The development server runs at `http://127.0.0.1:4321`.

| Command           | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run format`  | Format source files                                                      |
| `npm run verify`  | Check formatting and types, build, and validate local links and metadata |
| `npm run build`   | Generate the static site in `dist/`                                      |
| `npm run preview` | Serve the production build locally                                       |

## Content

- `src/pages/*.md`: project information, governance, community, quickstart, and privacy.
- `src/pages/*.astro`: homepage, specification index, implementation directory, and protocol overview.
- `src/data/site.ts`: navigation, specification links, and SDK listings.
- `src/layouts/`: shared page layouts.
- `src/styles/global.css`: site styles.
- `public/`: static assets.

## Deployment

Enable GitHub Pages with **GitHub Actions** as the source. Pushes to `main` run
validation and deploy through the `github-pages` environment. The deployment
workflow can also be run manually.

The workflow reads the site's URL from GitHub Pages. For a local build,
`SITE_URL` sets the canonical origin and base path; the default is `https://ansinfo.ai/`.

```sh
SITE_URL=https://agentnameservice.github.io/ans-site/ npm run build
SITE_URL=https://agentnameservice.github.io/ans-site/ npm test
```

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution requirements.
Licensed under [Apache-2.0](LICENSE).
