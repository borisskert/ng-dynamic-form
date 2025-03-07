describe('Single Cash Payment', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('App Component')
  })
})
