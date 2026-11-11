# Open Square Static Site

*Open Square* is NYU Press’s platform for publishing and reading open access books. This repository contains the content for static pages (such as the *about* page), configurations, and theme for the Open Square website, built using [Hugo](https://gohugo.io/).

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
    - [Install HVM](#install-hvm)
    - [Select the Project's Hugo Version](#select-the-projects-hugo-version)
    - [Update the Hugo Version](#update-the-hugo-version)
  - [Refreshing the data](#refreshing-the-data)
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
There are now two repositories used to publish. One refreshes the data from the API, and the other builds the html site from that data.

```
dlts-open-square/
├── config/                # Hugo configuration files for different environments
├── content/               # Markdown content for site pages
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
```
dlts-open-square-markdown-hugo/
├── config/                # Hugo configuration files for different environments
├── content/               # Markdown content for site pages
│   └── books/             # Code for calling latest book data from API
├── layouts/               # Theme to shape the .md files
├── output /               # The actual markdown content; other repo points here
├── README.md              # More info about repo
└── ...
```

---

## Installation

### Prerequisites

- Hugo Version Manager (`hvm`), installed and available on your `PATH`.
- HVM's shell alias configured, so the `hugo` command uses the version selected for this repository.
- Git
- Internet access the first time HVM downloads the pinned Hugo version.
- Go 1.26.3 or later only if you choose to install HVM from source.

You do not need to install Hugo separately. The repository's `.hvm` file pins Hugo to `v0.169.0`; this site uses the Extended edition to build its SCSS assets.

### Install HVM

Download the prebuilt HVM release for your operating system and CPU architecture from the [HVM releases page](https://github.com/jmooring/hvm/releases), then make sure the `hvm` executable is on your `PATH`.

Alternatively, install HVM from source with Go 1.26.3 or later:

```sh
go install github.com/jmooring/hvm@latest
```

Check that HVM is available:

```sh
hvm --version
```

HVM needs a shell alias to route `hugo` through the version manager. For zsh, run `hvm gen alias zsh --help` for setup directions, then add the output of `hvm gen alias zsh` to `~/.zshrc`. Open a new shell to activate it. For another shell, replace `zsh` with the shell name shown by `hvm gen alias --help` and follow its instructions.

### Select the Project's Hugo Version

From the `dlts-open-square` repository root, use the version in `.hvm`:

```sh
hvm use --useVersionInDotFile
```

If HVM asks which edition to use, select **Extended**. Verify that Hugo reports both the pinned version and the Extended edition:

```sh
hugo version
hvm status
```

The Hugo version output should include `v0.169.0` and `+extended`. `hvm status` shows which version is configured and which versions are cached locally.

### Update the Hugo Version

To intentionally change the project's Hugo version, run `hvm use` from the repository root and select the new version and Extended edition. HVM updates `.hvm`; include that pin change in the same commit as the change that requires it so other developers use the same Hugo version.

## Refreshing the data

To refresh the data, use the `hugo` command with the appropriate environment:

```sh
cd ../dlts-open-square-markdown-hugo
hugo -e stage
```


## Building the Site

### Commands



With the HVM shell alias configured, the `hugo` command uses the version pinned in `.hvm`. Select the build environment with the `-e` flag:

```sh
# For local development
hugo -e local

# For development or staging
hugo -e dev
hugo -e stage

# For production build
hugo -e production
hugo -e production
```

- The `-e` flag selects the environment configuration from the `config/` directory.

### Running the Development Server

```sh
hugo server -e local
```

- Visit [http://localhost:1313/](http://localhost:1313/) to preview the site.


---

## Development Workflow

1. **Clone the repositories:**
   ```sh
   git clone https://github.com/NYULibraries/dlts-open-square.git
   git clone https://github.com/NYULibraries/dlts-open-square-markdown-hugo.git
   cd dlts-open-square
   ```

2. **Install HVM:**
  Install HVM, configure its shell alias, and select the project's pinned Hugo version (see [Installation](#installation)).

3. **Start the server:**
   ```sh
   hugo server -e local
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
- [Hugo Version Manager Documentation](https://github.com/jmooring/hvm)
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
