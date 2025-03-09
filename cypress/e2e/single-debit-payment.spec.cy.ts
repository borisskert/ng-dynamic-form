describe('Single Debit', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill debit payment details and submit', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .selectDebit({
        accountHolder: 'Joanna Doe',
        iban: 'DE12 1234 1234 1234 1234 12',
        bic: 'ABCDEF12',
      })
      .then(() => cy
        .get('.dynamic-form--submit').click()
      )
    )

    it('Should show submitted form value', () => {
      cy.shouldShowSubmittedDebit({
          name: 'John Doe',
          accountHolder: 'Joanna Doe',
          iban: 'DE12 1234 1234 1234 1234 12',
          bic: 'ABCDEF12',
        }
      )
    })
  });
})
