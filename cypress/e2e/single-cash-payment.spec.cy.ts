describe('Single Cash Payment', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('App Component')
  })

  describe('When fill name, select cash and submit', () => {
    beforeEach(() => cy
      .get('.dynamic-form--name').type('John Doe')
      .switchToCash()
    )

    describe('When submit', () => {
      beforeEach(() => cy.submitForm());

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedCash({
          name: 'John Doe'
        })
      })
    })

    describe('When fill incorrect creditCard and switch back', () => {
      beforeEach(() => cy
        .selectCreditCard({
          cardNumber: '123456789012345a',
          expiryDate: '12/23',
          cvv: '123',
        })
        .then(() => cy
          .switchToCash()
        ).then(() => cy
          .submitForm()
        )
      )

      it('Should show submitted form value', () => {
        cy.shouldShowSubmittedCash({
          name: 'John Doe'
        })
      })
    })
  });
})
