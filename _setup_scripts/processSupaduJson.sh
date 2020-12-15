#!/bin/sh

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
  jq --sort-keys '.["subjects"] = (.subject | split(" / "))| .["isbn"] = .identifier | .["series"] = .series_names | .["bookpubdate"] = .date | .["date"] = .date + "-01-01" | .["citation_link"] = .handle | del(.type, .subject, .identifier) ' $filename > "../content/books/$isbn.md"
  echo done
  echo ...
done
