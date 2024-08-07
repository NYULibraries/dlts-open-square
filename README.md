# Static pages for Open Square: Knowledge without Boundaries

URL: https://opensquare.nyupress.org/

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

Hugo contains the original content (in the _content_ directory), and also compiles it into HTML (here, in the _docs_ directory.)

If refreshing the content (pulling it from latest epub metadata):

* Clone the JSON found here:  https://github.com/NYULibraries/dlts-epub-metadata

* Run a script to transform that JSON to .md files
cd _setup_scripts
sh ./processSupaduJson.sh ../../dlts-epub-metadata

To build: use the hugo command, with the -e (environment) option, and one of the environments set up in config directory, for example
 * hugo --enableGitInfo --cleanDestinationDir --ignoreCache -e local
  * hugo --cleanDestinationDir --ignoreCache -e dev
  * hugo --cleanDestinationDir --ignoreCache -e stage
  * hugo --enableGitInfo --cleanDestinationDir  --ignoreCache -e production
  * hugo --enableGitInfo --cleanDestinationDir  --ignoreCache --minify -e production


For hot reload: use the hugo server command, with the -b (baseurl) option, for example,
  * hugo server -b "https://opensquare.local"


## Associated Repositories

The Vue.js / Solr search application: https://github.com/NYULibraries/dlts-open-square-search-application

The builder for the reader: https://github.com/NYULibraries/dlts-readium-js-viewer

The plugin for the reader (automatically installed by the builder above): https://github.com/NYULibraries/dlts-rjs-plugin-open-square

