# Open Square Static Site

*Open Square* is NYU Press’s platform for publishing and reading open access books. This repository contains the content for static pages, code for accessing the data for the books, configuration, and theme for the Open Square website, built using [Hugo](https://gohugo.io/).

- **Live Site:** [https://opensquare.nyupress.org/](https://opensquare.nyupress.org/)
- **Stage Site (requires VPN):** [https://opensquare-stage.nyupress.org/](https://opensquare-stage.nyupress.org/)
- **Development Site (requires VPN):** [https://opensquare-dev.nyupress.org/](https://opensquare-dev.nyupress.org/)

---

## Table of Contents
- [Open Square Static Site](#open-square-static-site)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Repository Structure](#repository-structure)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Install on macOS](#install-on-macos)
  - [Building the Site](#building-the-site)
    - [Commands](#commands)
    - [Running the Development Server](#running-the-development-server)
  - [Development Workflow](#development-workflow)
  - [Deployment](#deployment)
  - [Associated Repositories](#associated-repositories)
  - [Customization](#customization)
  - [Analytics \& Tracking](#analytics--tracking)
  - [License](#license)
  - [Resources](#resources)
  - [Contributing](#contributing)
  - [Contact](#contact)

---

## Project Overview

Open Square provides open access to scholarly books published by NYU Press. The site consists of:

- Static HTML pages for the home page, about page, subject pages, series pages, and book details.
- A JavaScript search application (external repo).
- An EPUB book-reading application (external repo).

This repository contains configurations, some content written in Markdown, code for accessing the latest data from a dedicated API, and the custom theme.

---

## Repository Structure

```
dlts-open-square/
├── config/                # Hugo configuration files for different environments
├── content/               # Markdown content for site pages
│   └── books/             # Code for calling latest book data from API
│   └── pages/             # Content for static "pages"
│   └── series/            # Information needed for "series" taxonomy items
│   └── subjects/          # Information needed for "subjects" taxonomy items
├── docs/                  # Generated static HTML (output)
├── static/                # Static assets (images, JS, CSS)
├── themes/
│   └── dlts-opensquare/   # Custom Hugo theme
├── README.md              # This file
└── ...
```

---

## Installation

### Prerequisites

- [Hugo](https://gohugo.io/installation/) 0.147.8 or later
- Git

### Install on macOS

- [Hugo](https://gohugo.io/installation/)
```sh
brew install hugo
```
or
```sh
brew upgrade hugo
```

---

## Building the Site

### Commands
To build the static site, use the `hugo` command with the appropriate environment:

```sh
# For local development
hugo --ignoreCache -e local

# For development or staging
hugo --ignoreCache -e dev
hugo --ignoreCache -e stage

# For production build
hugo -e production
hugo --ignoreCache -e production
```

- The `--ignoreCache` flag ensures fresh data from remote sources. It takes a few minutes to build this way.
- The `-e` flag selects the environment configuration from the `config/` directory.

### Running the Development Server

```sh
hugo server --ignoreCache -e local
```

- Visit [http://localhost:1313/](http://localhost:1313/) to preview the site.


---

## Development Workflow

1. **Clone the repository:**
   ```sh
   git clone https://github.com/NYULibraries/dlts-open-square.git
   cd dlts-open-square
   ```

2. **Install dependencies:**
   Ensure Hugo is installed and updated (see above).

3. **Start the server:**
   ```sh
   hugo server --ignoreCache -e local
   ```

4. **Edit content or theme:**
   - Content: `content/`
   - Theme: `themes/dlts-opensquare/`

5. **Build for stage:**
   ```sh
   hugo -e stage
   ```

---

## Deployment

- The static site output is generated in the `docs/` directory.
- Deploy the contents of `docs/` to your web server or static hosting provider.

---

## Associated Repositories

- **Vue.js / Solr Search Application:**
  [dlts-open-square-search-application](https://github.com/NYULibraries/dlts-open-square-search-application)

- **EPUB Reader Builder:**
  [dlts-readium-js-viewer](https://github.com/NYULibraries/dlts-readium-js-viewer)

- **Reader Plugin:**
  [dlts-rjs-plugin-open-square](https://github.com/NYULibraries/dlts-rjs-plugin-open-square)

---

## Customization

- **Theme:**
  The custom Hugo theme is in [`themes/dlts-opensquare/`](themes/dlts-opensquare/).
  It is derived from [vimux/blank](https://github.com/vimux/blank) and released under the MIT license.
  More information is available at [`themes/dlts-opensquare/README.md`](themes/dlts-opensquare/README.md).

- **Configuration:**
  Environment-specific settings are in the `config/` directory.
  See [Hugo configuration docs](https://gohugo.io/getting-started/configuration/) for details.

- **Content:**
  Add or edit Markdown files in `content/pages` to update site pages.



---
## Analytics & Tracking

The site uses:

- **Google Analytics (gtag.js):**
  Configured with anonymized IP tracking.

- **Matomo Analytics:**
  Hosted at `https://nyulib.matomo.cloud/` with site ID `18`.

Both scripts are included in the HTML output for all book pages.

---

## License

- **This repository:** MIT License.
- **Theme:** Derived from [vimux/blank](https://github.com/vimux/blank), MIT License.
  See [`themes/dlts-opensquare/README.md`](themes/dlts-opensquare/README.md) for details.

---

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Open Square Live Site](https://opensquare.nyupress.org/)
- [NYU Press](https://nyupress.org/)

---

## Contributing

Pull requests and issues are welcome! Please ensure your changes are tested locally before submitting.
1. Clone repo locally and checkout `dev`

1. Create a branch from dev for local development:
    $ git checkout -b name-of-your-bugfix-or-feature

1. Push your new branch to github and create a PR

---

## Contact

For questions or support, please contact the NYU Libraries Digital Library Technology Services team or create an issue in this github repository.
