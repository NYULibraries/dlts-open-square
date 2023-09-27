#!/bin/sh

# check for exploded epubs
# cd _set_up_scripts sh checkEpubs.sh

directory="../content/books"
key='"rootUrl": "epub_content/'
prefix="epub_content/"
insertion='"isDownloadable"'
readable='  "isReadable": true,'
nonreadable='   "isReadable": false,'
word="isReadable"

# Deletes isReadable key value pairs
for file in "$directory"/*; do
    if [ -f "$file" ]; then
        grep -q "$word" "$file"
        if [ $? -eq 0 ]; then
            sed -i '' "/$word/d" "$file"
            echo "Deleted line with '$word' from file: $file"
        fi
    fi
done

# Reassigns isReadable key value pairs
for file in "$directory"/*.md; do
    if [ -f "$file" ]; then
        while IFS= read -r line; do
            if [[ $line == *"$key"* ]]; then
                next_chars="${line#*$key}"
                next_chars="${next_chars:0:13}"
                url="https://opensquare-stage.nyupress.org/open-square-reader/cloud-reader/$prefix$next_chars/META-INF/container.xml"
                status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
                if [[ "$status" == "404" ]]; then
                  sed -i '' -e "/$insertion/{h;s/.*/$nonreadable/;p;g;N;}" "$file"
                  echo "URL $url returned a 404 status code."
                else
                  sed -i '' -e "/$insertion/{h;s/.*/$readable/;p;g;N;}" "$file"
                  echo "URL $url is accessible."
                fi
            fi
        done < "$file"
    fi
done
