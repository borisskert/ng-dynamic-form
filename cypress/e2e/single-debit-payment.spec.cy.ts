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

  describe('When load debit payment details', () => {
    beforeEach(() => cy.loadDebitPayment());

    it('Should load debit payment details', () => {
      cy.get('.debit-form-input--accountHolder').should('have.value', 'John Doe')
      cy.get('.debit-form-input--iban').should('have.value', 'DE12345678901234567890')
      cy.get('.debit-form-input--bic').should('have.value', 'GENODEF1M04')
    })

    describe('When submit', () => {
      beforeEach(() => cy.submitForm());

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedDebit({
          name: 'John Doe',
          accountHolder: 'John Doe',
          iban: 'DE12345678901234567890',
          bic: 'GENODEF1M04',
        })
      })
    })

    describe('When load creditCard payment details', () => {
      beforeEach(() => cy.loadCreditCardPayment());

      it('Should show creditCard payment details', () => {
        cy.get('.creditcard-form-input--cardnumber').should('have.value', '1234567890123456')
        cy.get('.creditcard-form-input--expiryDate').should('have.value', '12/22')
        cy.get('.creditcard-form-input--cvv').should('have.value', '123')
      })

      describe('When submit', () => {
        beforeEach(() => cy.submitForm());

        it('Should show submitted form value', () => {
          cy.shouldShowSubmittedCreditCard({
            name: 'John Doe',
            cardNumber: '1234567890123456',
            expiryDate: '12/22',
            cvv: '123',
          })
        })
      })
    })
  });
})
