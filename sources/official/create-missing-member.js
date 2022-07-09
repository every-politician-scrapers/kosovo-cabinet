const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

const terminate = message => {
  console.error(message)
  process.exit(1)
}

module.exports = (label) => {
  return {
    type: 'item',
    labels: { en: label },
    descriptions: meta.person_description || terminate("No person_description set in meta.json"),
    claims: {
      P31: { value: 'Q5' }, // human
      P106: { value: 'Q82955' }, // politician
    }
  }
}
