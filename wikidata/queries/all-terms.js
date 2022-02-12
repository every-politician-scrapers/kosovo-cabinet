const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

module.exports = function () {
  return `SELECT DISTINCT ?ordinal ?item ?itemLabel ?start ?end
                  ?inception ?inceptionPrecision
                  ?startTime ?startTimePrecision
                  ?abolished ?abolishedPrecision
                  ?endTime   ?endTimePrecision
                  ?replaces ?replacesLabel ?replacedBy ?replacedByLabel
                  ?follows ?followsLabel ?followedBy ?followedByLabel
  WHERE {
    ?item p:P31 ?isa .
    ?isa ps:P31 wd:Q15238777 ; pq:P642 wd:Q1246562 .
    OPTIONAL { ?isa pq:P1545 ?ordinal }
    OPTIONAL { ?item p:P571 [ a wikibase:BestRank ; psv:P571 [wikibase:timeValue ?inception ; wikibase:timePrecision ?inceptionPrecision] ] }
    OPTIONAL { ?item p:P580 [ a wikibase:BestRank ; psv:P580 [wikibase:timeValue ?startTime ; wikibase:timePrecision ?startTimePrecision] ] }
    OPTIONAL { ?item p:P576 [ a wikibase:BestRank ; psv:P576 [wikibase:timeValue ?abolished ; wikibase:timePrecision ?abolishedPrecision] ] }
    OPTIONAL { ?item p:P582 [ a wikibase:BestRank ; psv:P582 [wikibase:timeValue ?endTime   ; wikibase:timePrecision ?endTimePrecision]   ] }
    OPTIONAL { ?item wdt:P1365 ?replaces     }
    OPTIONAL { ?item wdt:P1366 ?replacedBy   }
    OPTIONAL { ?item wdt:P155 ?follows       }
    OPTIONAL { ?item wdt:P156 ?followedBy    }

    BIND(COALESCE(?inception, ?startTime) AS ?start)
    BIND(COALESCE(?abolished, ?endTime) AS ?end)

    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  # ${new Date().toISOString()}
  ORDER BY ?start`
}
