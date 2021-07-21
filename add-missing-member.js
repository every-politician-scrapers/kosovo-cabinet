module.exports = (label) => {
  return {
    type: 'item',
    labels: {
      en: label,
    },
    descriptions: {
      en: 'Politician in Kosovo',
    },
    claims: {
      P31: { value: 'Q5' }, // human
      P106: { value: 'Q82955' } // politician
    }
  }
}
