describe('Employee: Edit', () => {
  it('opens the page with employee query', () => {
    cy.visit('/employee?uid=123')

    cy.get('h1').should('contain', 'Edit employee')
  })

  it.skip('shows the necessary error, on form submit with invalid fields', () => {})

  it('updates the employee data, on a valid form submit', () => {
    cy.get('h1').should('contain', 'Edit employee')

    cy.get('input[name="grossSalary"]').clear().type('65000')

    cy.getDT('formFooter').find('button[type="submit"]').click()

    cy.getDT('formFooter').find('p').should('contain', 'Changes saved!')
  })

  it('shows the employee updated, on the employee page', () => {
    cy.getDT('formFooter')
      .find('button[type="button"]')
      .should('contain', 'Cancel')
      .click()

    cy.get('table tbody > tr:first-child').within(() => {
      cy.get('td:nth-child(4)').should('contain', '65000 USD per year')
    })
  })

  it('redirects to homepage when employee query uid does not match an employee', () => {
    cy.visit('/employee?uid=000000')

    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('h1').should('contain', 'People')
  })
})
