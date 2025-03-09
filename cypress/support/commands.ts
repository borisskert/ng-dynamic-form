// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    selectCash(): Chainable<Subject>;

    selectCreditCard(param: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    }): Chainable<Subject>;

    selectDebit(param: {
      accountHolder: string;
      iban: string;
      bic: string;
    }): Chainable<Subject>;

    shouldShowSubmittedCash(param: {
      name: string;
    }): Chainable<Subject>;

    shouldShowSubmittedCreditCard(param: {
      name: string;
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    }): Chainable<Subject>;

    shouldShowSubmittedDebit(param: {
      name: string;
      accountHolder: string;
      iban: string;
      bic: string;
    }): Chainable<Subject>;
  }
}

Cypress.Commands.add('selectCash', () => {
  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Cash').click()
    )
})

Cypress.Commands.add('selectCreditCard', (params) => {
  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Credit Card').click()
    )

    .then(() => cy
      .get('.creditcard-form-input--cardnumber')
      .focus()
      .type(params.cardNumber)
    )

    .then(() => cy
      .get('.creditcard-form-input--expiryDate')
      .focus()
      .type(params.expiryDate)
    )

    .then(() => cy
      .get('.creditcard-form-input--cvv')
      .focus()
      .type(params.cvv)
    )
})

Cypress.Commands.add('selectDebit', (params) => {
  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Debit').click()
    )

    .then(() => cy
      .get('.debit-form-input--accountHolder')
      .focus()
      .type(params.accountHolder)
    )

    .then(() => cy
      .get('.debit-form-input--iban')
      .focus()
      .type(params.iban)
    )

    .then(() => cy
      .get('.debit-form-input--bic')
      .focus()
      .type(params.bic)
    )
})

Cypress.Commands.add('shouldShowSubmittedCash', (param) => {
  return cy.get('div.submitted-value-container')
    .should(
      'contain.text',
      `{\n  "name": "${param.name}",\n  "payments": [\n    {\n      "paymentMethod": "cash",\n      "paymentDetails": null\n    }\n  ]\n}`
    )
});

Cypress.Commands.add('shouldShowSubmittedCreditCard', (param) => {
  return cy.get('div.submitted-value-container')
    .should(
      'contain.text',
      `{\n  "name": "${param.name}",\n  "payments": [\n    {\n      "paymentMethod": "creditCard",\n      "paymentDetails": {\n        "cardNumber": "${param.cardNumber}",\n        "expiryDate": "${param.expiryDate}",\n        "cvv": "${param.cvv}"\n      }\n    }\n  ]\n}`
    )
});

Cypress.Commands.add('shouldShowSubmittedDebit', (param) => {
  return cy.get('div.submitted-value-container')
    .should(
      'contain.text',
      `{\n  "name": "${param.name}",\n  "payments": [\n    {\n      "paymentMethod": "debit",\n      "paymentDetails": {\n        "accountHolder": "${param.accountHolder}",\n        "iban": "${param.iban}",\n        "bic": "${param.bic}"\n      }\n    }\n  ]\n}`
    )
});
