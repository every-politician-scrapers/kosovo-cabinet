#!/bin/zsh

indent() { sed 's/^/  /' }

wcheck=$1
wdresults="$(head -1 wikidata.csv)\n$(egrep -i $wcheck wikidata.csv)"
wikidata_count=$(echo $wdresults | qsv count)
if [[ $wikidata_count != 1 ]]
then
  echo "No unique match to wikidata.csv ($wikidata_count):"
  echo $wdresults | qsv behead | indent
  return
fi

item=$(echo $wdresults | qsv select item | qsv behead)
statementid=$(echo $wdresults | qsv select psid | qsv behead)

# If there's a second argument, use it for searching scraped.csv
#  else use the first argument for that as well

[[ -v 2 ]] && scheck=$2 || scheck=$1

scraped_results="$(head -1 scraped.csv)\n$(egrep -i $scheck scraped.csv)"
scraped_count=$(echo $scraped_results | qsv count)
if [[ $scraped_count != 1 ]]
then
  echo "No unique match to scraped.csv:"
  echo $scraped_results | qsv behead | indent
  return
fi

name=$(echo $scraped_results   | qsv select itemLabel               | qsv behead)
claims=$(echo $scraped_results | qsv select itemLabel,positionLabel | qsv behead | qsv fmt --out-delimiter " ")

echo "$statementid $claims"
echo "$statementid $claims" | xargs wd ar --maxlag 20 add-source-name.js > /dev/null

lang=$(jq -r '.lang // "en"' meta.json)

existing=$(wd label $item -l $lang)
if [[ $existing != $name ]]
then
  echo "Add alias: $item -> $name ($existing)"
  wd add-alias $item $lang $name > /dev/null
fi
