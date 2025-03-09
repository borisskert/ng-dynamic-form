describe('Multiple Payments', () => {
  beforeEach(() => {
    cy.visit('/')
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

    describe('When add debit payment details', () => {
      beforeEach(() => cy
        .get('.add-group__button').click()
        .selectDebit({
          accountHolder: 'Joanna Doe',
          iban: 'DE12 1234 1234 1234 1234 12',
          bic: 'ABCDEF12',
        }, 1)
      )

      describe('When submit', () => {
        beforeEach(() => cy.submitForm());

        it('Should show submitted form value', () => {
          cy.get('div.submitted-value-container').should('contain.text', `{\n  "name": "John Doe",\n  "payments": [\n    {\n      "paymentMethod": "creditCard",\n      "paymentDetails": {\n        "cardNumber": "1234567890123456",\n        "expiryDate": "12/23",\n        "cvv": "123"\n      }\n    },\n    {\n      "paymentMethod": "debit",\n      "paymentDetails": {\n        "accountHolder": "Joanna Doe",\n        "iban": "DE12 1234 1234 1234 1234 12",\n        "bic": "ABCDEF12"\n      }\n    }\n  ]\n}`)
        })
      })

      describe('When delete debit payment details', () => {
        beforeEach(() => cy.deletePayment(1))

        describe('When submit', () => {
          beforeEach(() => cy.submitForm());

          it('Should show submitted form value', () => {
            cy.get('div.submitted-value-container').should('contain.text', `{\n  "name": "John Doe",\n  "payments": [\n    {\n      "paymentMethod": "creditCard",\n      "paymentDetails": {\n        "cardNumber": "1234567890123456",\n        "expiryDate": "12/23",\n        "cvv": "123"\n      }\n    }\n  ]\n}`)
          })
        })
      })
    })
  })
})
