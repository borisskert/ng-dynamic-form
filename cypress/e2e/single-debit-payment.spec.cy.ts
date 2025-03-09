describe('Single Debit', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill debit payment details', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .selectDebit({
        accountHolder: 'Joanna Doe',
        iban: 'DE12 1234 1234 1234 1234 12',
        bic: 'ABCDEF12',
      })
    )

    describe('When submit', () => {
      beforeEach(() => cy.submitForm());

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedDebit({
          name: 'John Doe',
          accountHolder: 'Joanna Doe',
          iban: 'DE12 1234 1234 1234 1234 12',
          bic: 'ABCDEF12',
        })
      })
    })

    describe('When fill incorrect creditCard and switch back', () => {
      beforeEach(() => cy
        .selectCreditCard({
          cardNumber: '123456789012345a', // invalid card number
          expiryDate: '12/23',
          cvv: '123',
        })
        .then(() => cy
          .switchToDebit()
        ).then(() => cy
          .submitForm()
        )
      )

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedDebit({
          name: 'John Doe',
          accountHolder: 'Joanna Doe',
          iban: 'DE12 1234 1234 1234 1234 12',
          bic: 'ABCDEF12',
        })
      })
    })
  });
})
