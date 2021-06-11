describe('counter', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  it('should start with 0', () => {
    cy.get('.counter-value').should('contain', '0')
  })

  it('should increment by 1 when clicking the button', () => {
    cy.get('.counter-value').should('contain', '0')
    cy.get('button').click()
    cy.get('.counter-value').should('contain', '1')
  })
})
