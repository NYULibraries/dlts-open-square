#!/bin/sh

# cd _setup_scripts
#sh ./processSupaduJson.sh ../../dlts-epub-metadata

if [ -d "$1" ]
  then
    echo "\nProcessing $1"
else
	echo "Please supply a valid directory name"
	exit
fi

for filename in $(find $1 -type f -name "intake-descriptive.json"); do 
  testtitle=$(jq -r  '.title' $filename)
  isbn=$(jq -r  '.identifier' $filename)
  echo Processing: $testtitle: $filename 	
  # split is a jq function, not bash
  # https://jqplay.org/s/lKZtOV9VR4L
  jq --sort-keys '.["subjects"] = (.subject | sub ("Latino\\\\a Studies"; "latino-a-studies") | split(" / "))| .["isbn"] = .identifier | .["series"] = .series_names | .["bookpubdate"] = .date | .["date"] = .date + "-01-01" | .["citation_link"] = .permanent_url | del(.type, .subject, .identifier, .permanent_url) ' $filename > "../content/books/$isbn.md"
  echo done
  echo ...
done
