describe('Sign In Test', () => {
  beforeEach(()=> {
      cy.visit('http://localhost:3000/sign-in');
  })

  it('has a title', () => {
      cy.contains('Sign In');
  })

})