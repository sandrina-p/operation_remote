describe('Employees', () => {
  // NOTE: IRL we would mock this page content, but here it's static.
  it('shows a list with 3 employees', () => {
    cy.visit('/')

    cy.getDT('header', 'header').within(() => {
      cy.get('h1').should('contain', 'People')
      cy.get('p').should('contain', '3 employees')
      cy.get('a')
        .should('contain', 'Add employee')
        .and('have.attr', 'href')
        .and('equals', '/employee')
    })

    cy.getDT('table', 'table').find('thead > tr > th').should('have.length', 5)
    cy.getDT('table', 'table').find('tbody > tr').should('have.length', 3)
  })

  it('contains the correct data about the first employee', () => {
    // NOTE: 1 IRL I would assert raw data with unit tests (jest + enzyme)
    //  and use cypress to assert interactions/actions only.
    // NOTE 2: There's a 99.9%% change all the other elements are correct because it is a loop.
    //  If there is any edge case, perhaps it would be faster to assert it with a unit test.
    cy.getDT('table', 'table')
      .find('tbody > tr:first-child')
      .within(() => {
        cy.get('td:nth-child(1)').should('contain', 'Ann Henry')
        cy.get('td:nth-child(1)').should('contain', '04/12/1994')

        cy.get('td:nth-child(2)').should('contain', 'Product manager')
        cy.get('td:nth-child(3)').should('contain', 'United States')

        cy.get('td:nth-child(4)').should('contain', '60000 USD per year')

        cy.get('td:nth-child(5)')
          .find('a')
          .should('contain', 'Edit')
          .and('have.attr', 'href')
          .and('equals', 'employee?uid=123')
        cy.get('td:nth-child(5)')
          .find('a')
          .and('have.attr', 'aria-label')
          .and('equals', 'Edit Ann Henry profile')
      })
  })
})
