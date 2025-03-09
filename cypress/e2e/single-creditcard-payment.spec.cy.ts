describe('Single CreditCard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill creditCard payment details and submit', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .selectCreditCard({
        cardNumber: '1234567890123456',
        expiryDate: '12/23',
        cvv: '123',
      })
      .then(() => cy
        .get('.dynamic-form--submit').click()
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
  });
})
