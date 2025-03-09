describe('Single CreditCard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill creditCard payment details', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .selectCreditCard({
        cardNumber: '1234567890123456',
        expiryDate: '12/23',
        cvv: '123',
      })
    )

    describe('When submit', () => {
      beforeEach(() => cy.submitForm());

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedCreditCard({
          name: 'John Doe',
          cardNumber: '1234567890123456',
          expiryDate: '12/23',
          cvv: '123',
        })
      })
    })

    describe('When fill incorrect debit and switch back', () => {
      beforeEach(() => cy
        .selectDebit({
          accountHolder: 'John Doe',
          iban: 'DE89 3704 0044 0532 0130 0a', // invalid IBAN
          bic: 'COBADEFFXXX',
        })
        .then(() => cy
          .switchToCreditCard()
        )
        .then(() => cy
          .submitForm()
        )
      )

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedCreditCard({
          name: 'John Doe',
          cardNumber: '1234567890123456',
          expiryDate: '12/23',
          cvv: '123',
        })
      })
    })
  });
})
