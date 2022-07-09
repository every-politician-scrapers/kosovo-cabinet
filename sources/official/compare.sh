#!/bin/bash

cd $(dirname $0)

bundle exec ruby scraper.rb | qsv select name,position | qsv rename itemLabel,positionLabel > scraped.csv
wd sparql -f csv wikidata.js | sed -e 's/T00:00:00Z//g' -e 's#http://www.wikidata.org/entity/##g' | qsv dedup -s psid > wikidata.csv
bundle exec ruby diff.rb | qsv sort -s itemlabel | tee diff.csv

cd ~-
