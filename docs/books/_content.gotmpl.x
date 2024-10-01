

{{/* Get remote data. */}}
{{ $data := dict }}
{{ $docs := dict }}
{{ $url := "https://sites.dlib.nyu.edu/viewer/api/v1/epubs/nyu-press" }}

{{ $opts := dict
  "method" "get"
  "headers" (dict
    "Content-Type" "application/x-www-form-urlencoded"
  )
  "body" `{"complete": true}`
}}

{{ with resources.GetRemote $url $opts }}
  {{ with .Err }}
    {{ errorf "Case 1: Unable to get remote resource %s: %s" $url . }}
  {{ else }}
    {{ $data = .Content | transform.Unmarshal }}
    {{ $docs = index $data "response" "docs"  }}
  {{ end }}
{{ else }}
  {{ errorf "Case 2: Unable to get remote resource %s" $url }}
{{ end }}

{{/* Add pages */}}
{{ range $docs }}
  {{ $uri := .uri  }}
  {{ warnf "URI is :  %s" .uri }}
    {{/* Get remote data for each book */}}
    {{ $opts := dict
      "method" "get"
      "headers" (dict
        "Content-Type" "application/x-www-form-urlencoded"
      )
      "body" `{"complete": true}`
    }}

    {{ with resources.GetRemote $uri $opts }}
      {{ with .Err }}
        {{ errorf "Case 1: Unable to get remote resource %s: %s" $uri . }}
      {{ else }}
        {{ $data := .Content | transform.Unmarshal }}
        {{ $title := index $data "title"   }}
        {{ $date := index $data "dateBook"   }}
        {{ warnf "Good! :  %s %s " $title $date  }}
        {{ $subjects := index $data "subjects"  }}
        {{ $subjects = collections.Apply $subjects "strings.Trim" "." " " }}
        {{ $subjects = collections.Apply $subjects "strings.Replace" "." "Latino\\a Studies" "latino-a-studies" }}
        {{ $contributors := (index $data "contributors" ) | transform.Unmarshal }}
        {{ $paramsAll :=  $data }}
        {{ $paramsUpdate :=  dict
          "date" $date
          "citation_link" (index $data "handle")
          "subjects" $subjects
          "series" (index $data "series")
        }}
        {{ $params :=  merge $paramsAll $paramsUpdate }}
        {{ $page := dict
          "title" $title
          "date" $date
          "kind" "page"
          "params" $params
          "path" (index $data "openSquareId")
        }}
        {{ $.AddPage $page }}
      {{ end }}
    {{ else }}
      {{ errorf "Case 2: Unable to get remote resource %s" $uri }}
    {{ end }}
{{ end }}
