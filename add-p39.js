module.exports = (id, position) => ({
  id,
  claims: {
    P39: {
      value: position,
      qualifiers: {
        P580: '2021-03-22',
        P5054: 'Q106131506'
      },
      references: {
        P854: 'https://kryeministri.rks-gov.net/en/the-prime-minister/government-cabinet/'
      },
    }
  }
})
