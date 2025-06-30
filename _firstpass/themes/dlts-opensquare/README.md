# dlts-opensquare Hugo Theme

Open Square is NYU Press’s platform for publishing and reading open access books. This repository contains the custom Hugo theme for the Open Square website.

## Overview

This theme provides the visual structure and styling for the Open Square website, built using the Hugo static site generator. It includes layouts, partials, assets (SCSS, images, JavaScript), and configuration to create a cohesive and accessible user experience.

## Key Features

*   **Custom Design:**  Unique visual identity tailored for NYU Press Open Square.
*   **Responsive Layout:**  Utilizes Material Design Components (MDC) Layout Grid for flexible display across devices.
*   **SCSS Styling:**  Organized and maintainable styles using SCSS, including custom mixins and partials.
*   **Pre-built Layouts:**  Includes layouts for the homepage, book details, series, subjects, and more.
*   **Partials:** Reusable components for headers, footers, book summaries, contributor bios, etc.
*   **Accessibility:** Focus on accessible design principles.

## Dependencies

*   [Material Design Components (MDC)](https://material.io/components): Used for layout and UI elements.
*   [Deque Systems Pattern Library](https://www.npmjs.com/package/deque-pattern-library/v/3.0.1): Used for accessible JS components
    *   See [https://github.com/dequelabs](https://github.com/dequelabs)

## Customization

The theme offers several ways to customize the appearance and functionality of your Open Square website:

*   **SCSS Variables:** Modify the SCSS variables in [`assets/style.scss`](assets/style.scss) to adjust colors, fonts, and spacing.
*   **Layouts:**  Override the theme's layouts by creating corresponding files in your project's `layouts` directory.  For example, to customize the book detail page, create a file at `layouts/books/single.html`.
*   **Partials:**  Similarly, override partials by creating files in your project's `layouts/partials` directory.
*   **Hugo Configuration:**  Use Hugo's configuration options to control various aspects of the site, such as menus, taxonomies, and site metadata.

## File Structure

*   [`assets/`](assets/): Contains SCSS files, JavaScript, images, and other assets.
    *   [`assets/google-material-design/`](assets/google-material-design/): Google Material Design
    *   [`assets/style.scss`](assets/style.scss): Main SCSS file
    *   [`assets/images/`](assets/images/): Images used in the theme
    *   [`assets/js`](assets/js/): Deque's Accessible JS Framework
    *   [`assets/mixins`](assets/mixins/): Reusable SCSS functions
    *   [`assets/partials`](assets/partials/): Reusable SCSS code blocks
*   [`layouts/`](layouts/): Contains the HTML templates for different page types
    *   [`layouts/index.html`](layouts/index.html):  Homepage
    *   [`layouts/_default/`](layouts/_default/): Default layouts for content pages and lists
        *   [`layouts/_default/term.html`](layouts/_default/term.html): Layout for series and subject pages
    *   [`layouts/books/`](layouts/books/): Layouts specific to book pages
        *   [`layouts/books/list.html`](layouts/books/list.html): Layout for the `all books` page
        *   [`layouts/books/single.html`](layouts/books/single.html): Individual book pages
        *   [`layouts/books/single.read.html`](layouts/books/single.read.html): "Wrapper" iframe pages for individual books
    *   [`layouts/partials/`](layouts/partials/): Reusable HTML snippets
*   [`static/`](static/):  Static assets that are copied directly to the public directory
*   [`theme.toml`](theme.toml):  Hugo theme configuration file


## License

This theme is derived from [vimux/blank](https://github.com/vimux/blank) and is released under the [MIT license](https://github.com/vimux/blank/blob/master/LICENSE.md).
