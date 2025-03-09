describe('Single Cash Payment', () => {
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
                .get('.dynamic-form--submit').click()
            )
        )

        it('Should show submitted form value', () => {
            cy.get('.submitted-value-container')
                .should(
                    'contain.text',
                    '{\n  "name": "John Doe",\n  "payments": [\n    {\n      "paymentMethod": "cash",\n      "paymentDetails": null\n    }\n  ]\n}'
                )
        })
    });
})
