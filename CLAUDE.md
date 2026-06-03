# Open Square Hugo Site

## Quick Context

This is a two-repo Hugo setup that compiles book metadata from an API into a static site.

- **Primary repo** (this one): dlts-open-square — the main Hugo site
- **Data repo**: dlts-open-square-markdown-hugo — generates markdown from API data

## Architecture

**How it works:**
1. markdown-hugo fetches book data from the Open Square API
2. Its Hugo build uses a simple template (`layouts/_default/single.md`) that outputs JSON: `{{ .Params | jsonify }}`
3. This generates pure JSON files in `output/books/{isbn}/index.md`
4. dlts-open-square mounts that output directory as content via module mounts (in config)
5. When dlts-open-square builds, Hugo treats the JSON as valid markdown and auto-populates `.Params` from the JSON
6. The theme template (`themes/dlts-opensquare/layouts/books/single.html`) accesses book data via `.Params` (e.g., `.Params.opensquareid`, `.Params.title`)

**Key insight:** Hugo doesn't require frontmatter. It treats JSON as markdown content and makes the top-level JSON object available as `.Params`.

## Config

- Base config: `config/_default/config.toml`
- Environment overrides: `config/stage/`, `config/production/`, `config/local/`, `config/dev/`
- Module mounts in config connect the markdown-hugo output: `source = '../dlts-open-square-markdown-hugo/output'`

## Critical Gotchas

### Books with future dates won't build

If a book's `datebook` or `date` field is in the future (e.g., "2026-06-02"), Hugo treats it as a future post and skips it during build.

**Fix:** Add `buildFuture = true` to the appropriate config file.

**Why:** Hugo's default behavior is to skip content with future publication dates. The book won't error—it just silently won't appear in output.

### Case sensitivity in templates

The theme template references `.Params` fields. The JSON keys are lowercase (e.g., `opensquareid`, `yearbook`, `descriptionhtml`). Template references must match exactly.

## Directory Structure

```
dlts-open-square/
├── config/              # Hugo config (environment-specific)
├── content/             # Content (series, subjects, pages)
├── docs/                # Published output (cleaned on each build)
├── themes/
│   └── dlts-opensquare/
│       └── layouts/
│           ├── books/          # Book page templates
│           │   ├── single.html  # Main book detail page
│           │   ├── list.html    # Book listing
│           │   └── single.read.html  # Reader view
│           └── partials/        # Reusable components
└── CLAUDE.md            # This file
```

## Build

```bash
hugo                    # Default: production
hugo -e stage          # Stage environment
hugo -e local          # Local development
```

Output goes to `docs/` directory (configured in config.toml).

## Template Notes

- Book pages use `.Params` fields from JSON: `.Params.opensquareid`, `.Params.contributors`, `.Params.series`, etc.
- Series and subjects are taxonomy pages that link back to books
- The template checks for EPUB files via remote HEAD request to verify readability

## Common Tasks

**Add a new book:** It auto-generates once dlts-opensquare-markdown-hugo publishes it and `buildFuture` allows it.

**Debug a book not building:** Check (1) date is not in future or `buildFuture=true`, (2) JSON is valid, (3) no intentional error handlers in template.

**Modify book display:** Edit `themes/dlts-opensquare/layouts/books/single.html`

**Add book metadata:** Build dlts-opensquare-markdown-hugo; it will generate files in the output directory.

*** Available Log Levels *** Hugo supports four distinct levels to control console output, which can be substituted into the flag:
`--logLevel=error`: Displays only fatal errors that fail the build.
`--logLevel=warn`: The default setting; displays warnings and errors only.
`--logLevel=info`: Displays general build information, warnings, and errors.
`--logLevel=debug`: Displays all logs, including highly detailed performance and trace data.
https://gohugo.io/troubleshooting/logging/

## Hugo Documentation

Local clone of Hugo docs: `/Users/henze/projects/github-lhenze/hugoDocs`

Key sections for this project:
- `content/en/configuration/` — Config options including buildFuture
- `content/en/content-management/` — How Hugo handles content files
- `content/en/hugo-modules/` — Module mounts (used to connect repos)
- `content/en/templates/` — Template syntax and .Params
