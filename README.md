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
- `src/pages/*.astro`: routes for the homepage, specification index, implementation directory, and protocol overview. Each renders the matching page component from the selected design.
- `src/data/site.ts`: navigation, specification links, and SDK listings.
- `src/data/designs.ts`: the list of selectable designs.
- `src/layouts/`: shared page layouts, which delegate to the selected design.
- `src/designs/<design>/`: one visual design each (`Shell.astro`, `styles.css`, `tokens.css`, `base.css`, and `pages/`). `current` is the production design.
- `public/`: static assets.

## Designs

`SITE_DESIGN` selects the design to build; the default is `current`. Page
components resolve from `src/designs/<design>/pages/`, then from
`src/designs/shared/pages/`.

```sh
SITE_DESIGN=cobalt npm run dev
```

`npm run build:preview` builds every design into `dist-preview/<design>/` with a
switcher bar at the top of each page, marks the pages `noindex`, and validates
each build. `PREVIEW_URL` sets the preview site's root (default
`https://agentnameservice.github.io/ans-site-preview/`). To browse the result
locally:

```sh
PREVIEW_URL=http://127.0.0.1:8080/ npm run build:preview
npm run preview:designs
```

Pushes to the `design/three-directions` branch run
`.github/workflows/preview.yml`, which publishes `dist-preview/` to the
`ans-site-preview` repository. That repository must exist with GitHub Pages
serving its `main` branch, and this repository needs a `PREVIEW_DEPLOY_KEY`
secret holding an SSH private key whose public half is a deploy key with write
access on `ans-site-preview`.

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
