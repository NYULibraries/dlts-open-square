#!/bin/sh

# http://discovery1.dlib.nyu.edu/solr/open-square-metadata/select?indent=on&q=*:*&wt=json&rows=1999

if [ -f "$1" ]
  then
    echo "\nProcessing $1"
else
	echo "Please supply a valid file name"
	exit
fi

arrayOfRecords=$(jq -rc .response.docs[].identifier $1)
echo "${arrayOfRecords}" | jq '.'

for row in ${arrayOfRecords}; do
  # --arg row $row will make the number into a string again
  testtitle=$(jq -c --arg row $row '.response.docs[] | select(.identifier==$row) | .title' $1)
  # Checks for title
 if [ "$testtitle" != "null" ]
 then
 		echo  "Writing $testtitle $row  . "
		jq -r --arg row $row  '.response.docs[] | select(.identifier==$row)' $1 > "json/books/$row.json"
 	else
 		echo "$row does not have a title"
  fi
done
