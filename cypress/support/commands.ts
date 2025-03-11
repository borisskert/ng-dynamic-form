// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    switchToCash(): Chainable<Subject>;

    switchToCreditCard(): Chainable<Subject>;

    selectCreditCard(param: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    }): Chainable<Subject>;

    switchToDebit(index?: number): Chainable<Subject>;

    selectDebit(param: {
      accountHolder: string;
      iban: string;
      bic: string;
    }, index?: number): Chainable<Subject>;

    submitForm(): Chainable<Subject>;

    deletePayment(index: number): Chainable<Subject>;

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

    loadCreditCardPayment(): Chainable<Subject>;

    loadDebitPayment(): Chainable<Subject>;

    loadCreditCardAndDebitPayment(): Chainable<Subject>;
  }
}

Cypress.Commands.add('switchToCash', () => {
  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Cash').click()
    )
})

Cypress.Commands.add('switchToCreditCard', () => {
  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Credit Card').click()
    )
})

Cypress.Commands.add('selectCreditCard', (param) => {
  return cy
    .switchToCreditCard()

    .then(() => cy
      .get('.creditcard-form-input--cardnumber')
      .focus()
      .type(param.cardNumber)
    )

    .then(() => cy
      .get('.creditcard-form-input--expiryDate')
      .focus()
      .type(param.expiryDate)
    )

    .then(() => cy
      .get('.creditcard-form-input--cvv')
      .focus()
      .type(param.cvv)
    )
})

Cypress.Commands.add('switchToDebit', (index: number | undefined = undefined) => {
  if (index !== undefined) {
    console.log('index', index)
    return cy
      .then(() => cy
        .get('.payment-form--payment-method').eq(index).click({force: true})
        .get('mat-option').contains('Debit').click()
      )
  }

  return cy
    .then(() => cy
      .get('.payment-form--payment-method').click()
      .get('mat-option').contains('Debit').click()
    )
})

Cypress.Commands.add('selectDebit', (param, index: number | undefined = undefined) => {
  return cy
    .switchToDebit(index)

    .then(() => cy
      .get('.debit-form-input--accountHolder')
      .focus()
      .type(param.accountHolder)
    )

    .then(() => cy
      .get('.debit-form-input--iban')
      .focus()
      .type(param.iban)
    )

    .then(() => cy
      .get('.debit-form-input--bic')
      .focus()
      .type(param.bic)
    )
})

Cypress.Commands.add('submitForm', () => {
  return cy
    .get('.dynamic-form--submit').click()
})

Cypress.Commands.add('deletePayment', (index) => {
  return cy
    .get('.payment-form__container').eq(index)
    .find('.delete-payment__button').click()
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

Cypress.Commands.add('loadCreditCardPayment', () => {
  cy.get('.button-load-creditcard').click()
});

Cypress.Commands.add('loadDebitPayment', () => {
  cy.get('.button-load-debit').click()
});

Cypress.Commands.add('loadCreditCardAndDebitPayment', () => {
  cy.get('.button-load-creditcard-and-debit').click()
});
