describe('Full AuthN SSO Login', () => {

    it('Visit Unity Staging Dashboard - verity title', () => {
        cy.visit('https://staging.dashboard.unity3d.com/gaming/login?redirectTo=Lw==')
        cy.title().should('eq', 'Unity Gaming Services')

        //Click sign in
        cy.get('button[id="onetrust-accept-btn-handler"]').click()
        cy.contains('Sign in').click()

        // CLick Sign in with SSO and enter the email
        cy.origin('https://id-staging.unity.com', () => {
            cy.contains('Sign in with SSO').click()

            // This pops up a Single Sign on window
            cy.get('[id="conversations_corporate_login_form_email"]').type('e2e@upidtest-e2e.com').should('have.value', 'e2e@upidtest-e2e.com')
            cy.get('[type="submit"]').click()
        })

        // Now the page is redirected to Okta to prompt user enter username and password
        cy.origin('https://dev-24480401.okta.com', () => {
            cy.get('[autocomplete="username"]').type('e2e@upidtest-e2e.com').should('have.value', 'e2e@upidtest-e2e.com')
            cy.get('[autocomplete="current-password"]').type('UPIDe2e2022').should('have.value', 'UPIDe2e2022')
            cy.get('[type="submit"]').click()
            cy.wait(3000)
        })
        
        // cy.origin('https://staging.dashboard.unity3d.com', () => {
        //     cy.contains('Dashboard')
        // })
    })
})
