# Contributing

Contributions to the ANS website are welcome. Follow the project's
[Code of Conduct](https://github.com/agentnameservice/ans-spec/blob/main/CODE_OF_CONDUCT.md).

## Making changes

1. Follow the development instructions in [README.md](README.md).
2. Create a branch and make a focused change. Most written content lives in
   `src/pages/*.md`.
3. Run `npm run verify`. Check layout changes at desktop and mobile widths and
   confirm keyboard navigation works.
4. Open a pull request describing the change and its validation. Include
   screenshots for visual changes and disclose AI assistance when applicable.

Keep protocol descriptions aligned with the canonical specifications and
governance summaries aligned with the project records. Integration listings
should link to public source and documentation and identify research previews
and examples accurately.

## Submitting news

The News page lists news about the ANS and Trust Index open source projects.
An item qualifies when its subject is one of the following:

- The ANS or Trust Index specifications, or a repository in the
  [agentnameservice GitHub organization](https://github.com/agentnameservice),
  including releases and reference implementation milestones. Tag each item
  with the projects it covers: `ANS`, `Trust Index`, or both.
- A project announcement, such as a Linux Foundation press release or a
  governance decision.
- An integration between ANS and another open source project or open
  standard, for example a directory, gateway, or discovery specification that
  verifies ANS identities. Tag these items `Interoperability`.

General AI-agent or industry news does not qualify, and neither does a company
or product announcement that mentions ANS in passing. A vendor article
qualifies only when ANS itself is its subject.

To suggest an item, open an issue in this repository with the link. To add one,
append an entry to `src/data/news.ts` with the published title, date, source,
`kind` (`Press release` or `Blog post`), `projects` (`ANS`, `Trust Index`, or
both), and any `topics`. Write a two-sentence summary that states what the
item reports, in neutral language. Keep the summary vendor neutral: the
`source` field names the publisher, so refer to authors as engineers or
researchers and leave company names out unless the item is about those
organizations, as a press release listing its supporters is. The page sorts
items newest first and
builds a filter page for every kind, project, and topic in use. Add a new
project or topic to the `Project` or `Topic` type before using it.

## Developer Certificate of Origin

Sign off each commit to certify the [Developer Certificate of Origin](DCO):

```sh
git commit -s
```

## Security reports

Follow the [ANS security policy](https://github.com/agentnameservice/ans-spec/blob/main/SECURITY.md)
for suspected vulnerabilities. Do not include vulnerability details in a public issue.
