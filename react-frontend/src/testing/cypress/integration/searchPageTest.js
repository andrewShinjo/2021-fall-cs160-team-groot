/* Autocomplete by cypress */
/// <reference types="cypress" />

describe('Testing Search Page', function() {
    beforeEach(() => {
        // Opening search page and testing each functionality below
        cy.visit('http://localhost:3000/search');
    })

    it('Using both filters and user input to find recipe', function() {
        cy.get('#Vegetarian').click()
        cy.get('#peanut-free').click()
        cy.get('.searchBar').type('cauliflower crust pizza')
           .should('have.value', 'cauliflower crust pizza')
        cy.get('.buttonSearchResult').click()
        cy.get('.recipeResults').should('be.visible')
    })

    it('Valid recipe text input', function() {
        cy.contains('Search Results')
        // Typing in 'fish taCO' in search bar and asserting input is correctly inserted
        // in search bar
        cy.get('.searchBar').type('fIsh taCO')
            .should('have.value', 'fIsh taCO')
        // Clicking on 'Recipe Name' radio button category 
        cy.get('#recipeName').click()
        cy.get('.buttonSearchResult').click()
        // A recipe card should be visible since it matches with one of the recipe data
        cy.get('.recipeResults').should('be.visible')
    })

    it('No text input is provided', function() {
        // Checking if 'Restrictions' filter is visible
        cy.contains('Restrictions')
        // Providing empty input
        cy.get('.searchBar').type(' ')
           .should('have.value', ' ')
        cy.get('.buttonSearchResult').click()
        // Error message should pop up
        cy.contains('Sorry cannot find recipe, please try again!')
    })

    it('Selecting Ingredients category but providing Diet text input', function() {
        // Clicking on ingredients radio button
        cy.get('#ingredients').click()
        // Providing invalid input 
        cy.get('.searchBar').type('gluten-free')
           .should('have.value', 'gluten-free')
        cy.get('.buttonSearchResult').click()
        // Error message should pop up
        cy.contains('Sorry cannot find recipe, please try again!')
    })

})