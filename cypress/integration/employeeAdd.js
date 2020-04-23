const newEmployee = {
  name: 'Ines de castro',
  birthdate: '01/07/1355',
  jobTitle: 'Noblewoman',
  country: 'PT',
  grossSalary: '10000',
}

describe('Employee: Add', () => {
  it('opens the page with employee query', () => {
    cy.visit('/employee')

    cy.getDT('title', 'h1').should('contain', 'Add a new employee')
    cy.getDT('description', 'p').should(
      'contain',
      'Fill out the information of your new employee.'
    )
  })

  it('shows the necessary error, on form submit with invalid fields', () => {
    cy.get('input[name="name"]').type(newEmployee.name)

    cy.getDT('formFooter').find('button[type="submit"]').click()

    // TODO - assert input name does not have a error message.
    // TODO - assert the other fields have inline error messages

    cy.getDT('formFooter')
      .find('p')
      .should('contain', 'Ups! Some fields are invalid, please verify them.')
  })

  it('updates the employee data, on a valid form submit', () => {
    cy.get('input[name="birthdate"]').type(newEmployee.birthdate)
    cy.get('input[name="jobTitle"]').type(newEmployee.jobTitle)
    cy.get('select[name="country"]')
      .select(newEmployee.country)
      .should('have.value', newEmployee.country)
    cy.get('input[name="grossSalary"]').type(newEmployee.grossSalary)

    cy.getDT('formFooter').find('button[type="submit"]').click()
    cy.getDT('formFooter').find('p').should('contain', 'Employee added!')
  })

  it('shows the employee added, on the employee page', () => {
    cy.getDT('formFooter')
      .find('button[type="button"]')
      .should('contain', 'Cancel')
      .click()

    cy.get('table tbody > tr:last-child').within(() => {
      cy.get('td:nth-child(1)').should('contain', newEmployee.name)
      cy.get('td:nth-child(1)').should('contain', newEmployee.birthdate)

      cy.get('td:nth-child(2)').should('contain', newEmployee.jobTitle)
      cy.get('td:nth-child(3)').should('contain', 'Portugal') // TODO use contries[code]

      cy.get('td:nth-child(4)').should(
        'contain',
        `${newEmployee.grossSalary} USD per year`
      )
    })
  })
})
