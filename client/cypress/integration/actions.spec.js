describe('Actions', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    it('types into unput dom element', () => {
        cy.get('input[type="email"]')
            .type('hello@world').should('have.value', 'hello@world')

        cy.get('textarea.action-disabled')
            .type('disabled error checking', { force: true })
            .should('have.value', 'disabled error checking')

    })

    it('focus on dom element', () => {
        cy.get('.action-focus').focus()
            .should('have.class', 'focus')
            .prev().should('have.attr', 'style', 'color: orange;')
    })

    it('clear an input or text area', () => {
        cy.get('.action-clear').type('Hithere')
            .should('have.value', 'Hithere')
            .clear()
            .should('have.value', '')
    })

    it('submit a form', () => {
        cy.get('.action-form')
            .find('[type="text"]').type('lala')
        cy.get('.action-form').submit()
            .next().should('contain', 'Your form has been submitted!')
    })

    it('all the clicky stuff', () => {
        cy.get('.action-btn').click()

        // You can click on 9 specific positions of an element:
        //  -----------------------------------
        // | topLeft        top       topRight |
        // |                                   |
        // |                                   |
        // |                                   |
        // | left          center        right |
        // |                                   |
        // |                                   |
        // |                                   |
        // | bottomLeft   bottom   bottomRight |
        //  -----------------------------------

        // clicking in the center of the element is the default
        cy.get('#action-canvas').click()

        cy.get('#action-canvas').click('topLeft')
        cy.get('#action-canvas').click('top')
        cy.get('#action-canvas').click('topRight')
        cy.get('#action-canvas').click('left')
        cy.get('#action-canvas').click('right')
        cy.get('#action-canvas').click('bottomLeft')
        cy.get('#action-canvas').click('bottom')
        cy.get('#action-canvas').click('bottomRight')

        // .click() accepts an x and y coordinate
        // that controls where the click occurs :)

        cy.get('#action-canvas')
            .click(80, 75) // click 80px on x coord and 75px on y coord
            .click(170, 75)
            .click(80, 165)
            .click(100, 185)
            .click(125, 190)
            .click(150, 185)
            .click(170, 165)

        // click multiple elements by passing multiple: true
        cy.get('.action-labels>.label').click({ multiple: true })

        // Ignore error checking prior to clicking
        cy.get('.action-opacity>.btn').click({ force: true })
    })

    it('.dblclick() - double click on a DOM element', () => {
        // https://on.cypress.io/dblclick

        // Our app has a listener on 'dblclick' event in our 'scripts.js'
        // that hides the div and shows an input on double click
        cy.get('.action-div').dblclick().should('not.be.visible')
        cy.get('.action-input-hidden').should('be.visible')
    })

    it('sheck a box or radiobutton', () => {
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
            .check().should('be.checked')
    })

    it('selects an option in a select element', () => {
        cy.get('.action-select-multiple')
            .select(['apples', 'oranges', 'bananas'])
        cy.get('.action-select').select('apples')
    })

    it('scrolls element into view', () => {
        cy.get('#scroll-horizontal button')
            .should('not.be.visible')

        cy.get('#scroll-horizontal button')
            .scrollIntoView()
            .should('be.visible')
    })

    it('trigger an event on a DOM element', () => {
        cy.get('.trigger-input-range')
            .invoke('val', 25)
            .trigger('change')
            .get('input[type=range]').siblings('p')
            .should('have.text', '25')

    })

    it('scrolls window to position', () => {
        cy.scrollTo('bottom')

        cy.get('#scrollable-horizontal').scrollTo('right')

        cy.get('#scrollable-vertical').scrollTo(250, 250)

        cy.get('#scrollable-both').scrollTo('75%', '25%')

        cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

        cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })

    })

})