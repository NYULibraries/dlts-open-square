#!/bin/bash

# Create new markdown files out of the json

for filename in ./json/books/*; do

	markdown='+++'

	if [ "$(jq -c '.author | .[0]' $filename )" != "null" ]; then
		authA=$(jq -c '.author | .[0]' $filename );
		markdown+="\nauthor = "$authA;
	fi

	if [ "$(jq -rc .handle $filename )" != "null" ]; then
		markdown+="\ncitation_link = "$(jq -c .handle $filename );
	fi

#	if [ "$(jq -rc .collection_code $filename )" != "null" ]; then
	#	markdown+="\ncollection_code = "$(jq -c .collection_code $filename );
#	fi

	if [ "$(jq -rc .date $filename )" != "null" ]; then
		markdown+="\nbookpubdate = "$(jq -rc .date $filename );
	fi

	if [ "$(jq -rc .date $filename )" != "null" ]; then
			thisstring=$(jq -rc .date $filename )
			thisdate=$thisstring-01-01
			markdown+="\ndate = $thisdate"
		fi

	if [ "$(jq -c .description $filename )" != "null" ]; then
	markdown+="\ndescription = "$(jq -c .description $filename );
	fi

	if [ "$(jq -rc .description_html $filename )" != "null" ]; then
	# omitting r flag prompts default behavior, which includes escaping quotes
	description_html=$(jq -c .description_html $filename);
	markdown+="\ndescription_html = "${description_html}
	fi

	if [ "$(jq -rc .format $filename )" != "null" ]; then
		markdown+="\nformat = "\"$(jq -rc .format $filename )\";
	fi

	if [ "$(jq -rc .identifier $filename )" != "null" ]; then
		markdown+="\nisbn = "$(jq -rc .identifier $filename );
		identifier=$(jq -rc .identifier $filename )
	fi

	if [ "$(jq -rc .publisher $filename )" != "null" ]; then
	 markdown+="\npublisher = "$(jq .publisher $filename );
	fi

	if [ "$(jq -rc .subtitle $filename )" != "null" ]; then
	 markdown+="\nsubtitle = "$(jq .subtitle $filename );
	fi

	if [ "$(jq -rc .thumbHref $filename )" != "null" ]; then
	markdown+="\nthumbhref = "\"$(jq -rc .thumbHref $filename )\"
	fi


	if [ "$(jq -rc .title $filename )" != "null" ]; then
	markdown+='\ntitle = '\"$(jq -rc .title $filename)\"
	fi

	if [ "$(jq -rc .title_sort $filename )" != "null" ]; then
	markdown+='\ntitle_sort = '\"$(jq -rc .title_sort $filename)\"
	fi


		if [ "$(jq -rc .subject $filename )" != "null" ]; then
		 markdown+="\nsolrsubject = "$(jq .subject $filename );
		fi
		
		if [ "$(jq -rc .license $filename )" != "null" ]; then
		markdown+="\nlicense = "\"$(jq -rc .license $filename )\"
		fi

		if [ "$(jq -rc .license_abbreviation $filename )" != "null" ]; then
		markdown+="\nlicense_abbreviation = "\"$(jq -rc .license_abbreviation $filename )\"
		fi

		if [ "$(jq -rc .license_icon $filename )" != "null" ]; then
		markdown+="\nlicense_icon = "\"$(jq -rc .license_icon $filename )\"
		fi

		if [ "$(jq -rc .license_link $filename )" != "null" ]; then
		markdown+="\nlicense_link = "\"$(jq -rc .license_link $filename )\"
		fi


	markdown+='\n\n+++'

	echo ${markdown} > "../content/books/$identifier.md"
	echo converting $filename to $identifier.md

done
