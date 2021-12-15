module.exports = (...positions) => {
  positions = positions.map(value => `wd:${value}`).join(' ')

  return `SELECT DISTINCT ?person ?personLabel ?position ?positionLabel (YEAR(?dob) AS ?birth) (YEAR(?dod) AS ?death)
    WHERE {
      VALUES ?position { ${positions} }
      ?person wdt:P31 wd:Q5 ; p:P39 ?ps .
      ?ps ps:P39 ?position .
      FILTER NOT EXISTS { ?ps wikibase:rank wikibase:DeprecatedRank }
      FILTER NOT EXISTS { ?ps pq:P580 [] }
      FILTER NOT EXISTS { ?ps pq:P582 [] }
      FILTER NOT EXISTS { ?ps pq:P2937 [] }
      FILTER NOT EXISTS { ?ps pq:P5054 [] }
      OPTIONAL { ?person wdt:P569 ?dob }
      OPTIONAL { ?person wdt:P570 ?dod }
      FILTER (!BOUND(?dod) || (YEAR(?dod) > 2000))
      FILTER (!BOUND(?dob) || (YEAR(?dob) > 1900))
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    } # ${new Date().toISOString()}
    ORDER BY DESC(?birth) ?positionLabel`
}

