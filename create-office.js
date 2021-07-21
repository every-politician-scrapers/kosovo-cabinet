// wd create-entity create-office.js "Minister for X"
module.exports = (label) => {
  return {
    type: 'item',
    labels: {
      en: label,
    },
    descriptions: {
      en: 'Cabinet position in Kosovo',
    },
    claims: {
      P31:   { value: 'Q294414' }, // instance of: public office
      P279:  { value: 'Q83307'  }, // subclas of: minister
      P17:   { value: 'Q1246'   }, // country: Kosovo
      P1001: { value: 'Q1246'   }, // jurisdiction: Kosovo
      P361: {                      // part of: Cabinet of Kosovo
        value: 'Q107600990',
        references: {
          P854: 'https://kryeministri.rks-gov.net/en/the-prime-minister/government-cabinet/'
        },
      }
    }
  }
}
