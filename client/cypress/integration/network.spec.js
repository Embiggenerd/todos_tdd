describe('network stuff', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')
    })

    it('cy.server() - control behavior of network requests and responses', () => {
        // https://on.cypress.io/server

        cy.server().should((server) => {
            // the default options on server
            // you can override any of these options
            expect(server.delay).to.eq(0)
            expect(server.method).to.eq('GET')
            expect(server.status).to.eq(200)
            expect(server.headers).to.be.null
            expect(server.response).to.be.null
            expect(server.onRequest).to.be.undefined
            expect(server.onResponse).to.be.undefined
            expect(server.onAbort).to.be.undefined

            // These options control the server behavior
            // affecting all requests

            // pass false to disable existing route stubs
            expect(server.enable).to.be.true
            // forces requests that don't match your routes to 404
            expect(server.force404).to.be.false
            // whitelists requests from ever being logged or stubbed
            expect(server.whitelist).to.be.a('function')
        })

        cy.server({
            method: 'POST',
            delay: 1000,
            status: 422,
            response: {},
        })
    })

    it('make an XHR request', () => {
        cy.request('https://jsonplaceholder.cypress.io/comments')
            .should(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(500)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })
    })

    it('verify res using BDD syntax', () => {
        cy.request('https://jsonplaceholder.cypress.io/comments')
            .then(response => {
                // https://on.cypress.io/assertions
                expect(response).property('status').to.equal(200)
                expect(response).property('body').to.have.length(500)
                expect(response).to.include.keys('headers', 'duration')
            })
    })

    it('route responses to matching requests', () => {
        let message = 'whoa'

        cy.server()

        cy.route('GET', 'comments/*').as('getComment')

        cy.get('.network-btn').click()

        cy.wait('@getComment').its('status').should('eq', 200)

        cy.route('POST', '/comments').as('postComment')

        cy.get('.network-post').click()

        cy.wait('@postComment')

        cy.get('@postComment').should(xhr => {
            expect(xhr.requestBody).to.include('email')
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
        })

        cy.route({
            method: 'PUT',
            url: 'comments/*',
            status: 404,
            response: { error: message },
            delay: 500,
        }).as('putComment')

        cy.get('.network-put').click()

        cy.wait('@putComment')

        cy.get('.network-put-comment').should('contain', message)
    })
})