describe('Single Debit', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill name', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .then(() => cy
        .get('.payment-form--payment-method').click()
        .get('mat-option').contains('Debit').click()
      )

      .then(() => cy
        .get('.debit-form-input--accountHolder')
        .focus()
        .type('Joanna Doe')
      )

      .then(() => cy
        .get('.debit-form-input--iban')
        .focus()
        .type('DE12 1234 1234 1234 1234 12')
      )

      .then(() => cy
        .get('.debit-form-input--bic')
        .focus()
        .type('ABCDEF12')
      )

      .then(() => cy
        .get('.dynamic-form--submit').click()
      )
    )

    it('Should show submitted form value', () => {
      cy.get('div.submitted-value-container')
        .should(
          'contain.text',
          '{\n  "name": "John Doe",\n  "payments": [\n    {\n      "paymentMethod": "debit",\n      "paymentDetails": {\n        "accountHolder": "Joanna Doe",\n        "iban": "DE12 1234 1234 1234 1234 12",\n        "bic": "ABCDEF12"\n      }\n    }\n  ]\n}'
        )
    })
  });
})
