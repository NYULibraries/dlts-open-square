# Static pages for Open Square: Knowledge without Boundaries

URL: http://opensquare.nyupress.org/

Open Square is NYU Press’s platform for publishing and reading open access books. 
It is comprised of static HTML pages used for the home page, subject pages, book details, etc; a Javascript search application; and the book-reading application itself. 

This repo holds the content, configurations, and theme for the static pages.
It uses Hugo (https://gohugo.io/), the world’s fastest framework for building websites.

## Installation

Install JQ (if you need to refresh data source)
  * brew install jq

Install Hugo
  * brew install hugo


## Build

For hot reload: use the hugo server command, with the -b (baseurl) option, for example,
  * hugo server -b "http://opensquare.local"

To build: use the hugo command, with the -e (environment) option, and one of the environments set up in config directory, for example
  * hugo -e local
  * hugo -e stage
