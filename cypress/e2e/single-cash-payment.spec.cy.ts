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
      .selectCash()
      .then(() => cy
        .get('.dynamic-form--submit').click()
      )
    )

    it('Should show submitted form value', () => {
      cy.shouldShowSubmittedCash({
        name: 'John Doe'
      })
    })
  });
})
