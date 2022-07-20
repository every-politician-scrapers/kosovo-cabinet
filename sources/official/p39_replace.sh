#!/bin/zsh

existing=$(qsv search -u -i $2 wikidata.csv | qsv count)

if [[ $existing != 1 ]]
then
    echo "No unique match for $2 in wikidata.csv:"
    qsv search -u -i $2 wikidata.csv | qsv table
    return
fi

oldqid=$(qsv search -u -i $2 wikidata.csv | qsv select item | qsv behead)
oldpsid=$(qsv search -u -i $2 wikidata.csv | qsv select psid | qsv behead)
position=$(qsv search -u -i $2 wikidata.csv | qsv select position | qsv behead)
leaving=$(qsv search -u -i $2 wikidata.csv | qsv select itemLabel | qsv behead)
positionLabel=$(qsv search -u -i $2 wikidata.csv | qsv select positionLabel | qsv behead)

echo "Terminating $leaving as $positionLabel on $1"
wd aq $oldpsid P582 $1

if [[ $3 =~ Q ]]
then
    wd aq $oldpsid P1366 $3
    newpsid=$(wd ac $3 P39 $position | jq -r .claim.id | sed -e 's/\$/-/') 

    if [[ $newpsid =~ Q ]]
    then
        sleep 1
        wd aq $newpsid P580 $1
        wd aq $newpsid P1365 $oldqid
    else
        echo "No valid PSID to add qualifiers to"
    fi
fi


