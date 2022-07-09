const fs = require('fs');
let rawmeta = fs.readFileSync('meta.json');
let meta = JSON.parse(rawmeta);

module.exports = (id, label, position, positionlabel, startdate, enddate) => {
  qualifier = { }
  if(startdate)              qualifier['P580']  = startdate
  if(enddate)                qualifier['P582']  = enddate
  if(!startdate && !enddate) qualifier['P5054'] = meta.cabinet.id

  return {
    id,
    claims: {
      P39: {
        value: position,
        qualifiers: qualifier,
        references: {
          ...meta.reference,
          P813: new Date().toISOString().split('T')[0],
          P1810: label,
          P1932: positionlabel,
        }
      }
    }
  }
}
