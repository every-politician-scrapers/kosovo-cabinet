#!/bin/sh

TMPFILE=$(mktemp)
HOLDERS=$(mktemp)
SORTED_BIOS=$(mktemp)
UNIQUE_BIOS=$(mktemp)

# Current holders of each wanted position
qsv select position wikidata/wanted-positions.csv |
  qsv behead |
  xargs wd sparql pcb/holders.js -f csv > $TMPFILE
sed -e 's#http://www.wikidata.org/entity/##g' -e 's/T00:00:00Z//g' $TMPFILE > $HOLDERS

# Biographical info for current officeholders
qsv select person $HOLDERS |
  qsv dedup |
  qsv behead |
  xargs wd sparql pcb/bios.js -f csv > $TMPFILE
sed -e 's#http://www.wikidata.org/entity/##g' -e 's/T00:00:00Z//g' $TMPFILE > $SORTED_BIOS

# Remove (and report on) extraneous bio info
qsv dedup -s person -D wikidata/results/extraneous-bios.csv $SORTED_BIOS > $UNIQUE_BIOS

# Generate current.csv
qsv join position wikidata/wanted-positions.csv position $HOLDERS |
  qsv select position,title,person,start > $TMPFILE
qsv join person $TMPFILE person $UNIQUE_BIOS |
  qsv select title,personLabel,person,start,genderLabel,dob,dobPrecision,dod,dodPrecision,image |
  qsv rename position,person,personID,start,gender,DOB,dobp,DOD,dodp,image > html/current.csv

# Generate HTML
erb country="$(jq -r .jurisdiction.name meta.json)" csvfile=html/current.csv -r csv -T- pcb/index.erb > html/index.html

echo "No matches for:"
qsv join --left-anti title wikidata/wanted-positions.csv position html/current.csv
