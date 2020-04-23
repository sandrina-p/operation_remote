describe('Header', () => {
  it('has a link to profile', () => {
    cy.visit('/')

    cy.get('header')
      .find('a')
      .should('contain', 'Julie Howard')
      .should('contain', 'Admin')
      .and('have.attr', 'href')
      .and('equals', '#dumb-profile')
  })
})
