module.exports = (...people) => {
  people = people.map(value => `wd:${value}`).join(' ')

  return `SELECT DISTINCT ?person ?personLabel ?personDescription ?gender ?genderLabel
          ?dob ?dobPrecision ?dod ?dodPrecision ?image
  WHERE {
    VALUES ?person { ${people} }

    OPTIONAL { ?person wdt:P21 ?gender }
    OPTIONAL { ?person wdt:P18 ?image  }

    OPTIONAL {
      ?person p:P569 [ a wikibase:BestRank ; psv:P569 [wikibase:timeValue ?dob ; wikibase:timePrecision ?dobPrecision] ]
    }

    OPTIONAL {
      ?person p:P570 [ a wikibase:BestRank ; psv:P570 [wikibase:timeValue ?dod ; wikibase:timePrecision ?dodPrecision] ]
    }

    SERVICE wikibase:label { bd:serviceParam wikibase:language "en".  }
  }
  # ${new Date().toISOString()}
  ORDER BY ?person ?dob ?dod`
}
