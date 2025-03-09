describe('Single CreditCard', () => {
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
        .get('mat-option').contains('Credit Card').click()
      )

      .then(() => cy
        .get('.creditcard-form-input--cardnumber')
        .focus()
        .type('1234567890123456')
      )

      .then(() => cy
        .get('.creditcard-form-input--expiryDate')
        .focus()
        .type('12/23')
      )

      .then(() => cy
        .get('.creditcard-form-input--cvv')
        .focus()
        .type('123')
      )

      .then(() => cy
        .get('.dynamic-form--submit').click()
      )
    )

    it('Should show submitted form value', () => {
      cy.get('div.submitted-value-container')
        .should(
          'contain.text',
          '{\n  "name": "John Doe",\n  "payments": [\n    {\n      "paymentMethod": "creditCard",\n      "paymentDetails": {\n        "cardNumber": "1234567890123456",\n        "expiryDate": "12/23",\n        "cvv": "123"\n      }\n    }\n  ]\n}'
        )
    })
  });
})
