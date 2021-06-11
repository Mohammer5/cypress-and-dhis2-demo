import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const pager = {
    page: 4,
    pageCount: 104,
    total: 1035,
    pageSize: 10,
    nextPage:
        'https://debug.dhis2.org/dev/api/37/dataElements?page=5&pageSize=10',
    prevPage:
        'https://debug.dhis2.org/dev/api/37/dataElements?page=3&pageSize=10',
}

const dataElements = [
    {
        id: 'oLfWYAJhZb2',
        displayName: 'ARI treated without antibiotics (cough) referrals',
    },
    {
        id: 'NJnhOzjaLYk',
        displayName: 'ART clients with new adverse clinical event',
    },
    {
        id: 'aIJZ2d2QgVV',
        displayName: 'ART defaulters',
    },
    {
        id: 'BOSZApCrBni',
        displayName: 'ART enrollment stage 1',
    },
    {
        id: 'dGdeotKpRed',
        displayName: 'ART enrollment stage 2',
    },
    {
        id: 'eRwOwCpMzyP',
        displayName: 'ART enrollment stage 3',
    },
    {
        id: 'zYkwbCBALhn',
        displayName: 'ART enrollment stage 4',
    },
    {
        id: 'I5MLuG16arn',
        displayName: 'ART entry point: No diagnostic testing',
    },
]

Given('there are 8 data elements', () => {
    cy.wrap(dataElements).as('dataElements')

    cy.intercept('GET', /dataElements/, {
        body: { pager, dataElements },
    })
})

Given('there are more than 10 data elements', () => {
    const eightDataElements = dataElements.slice(0, 8)
    cy.wrap(eightDataElements).as('dataElements')

    cy.intercept('GET', /dataElements/, {
        body: {
            pager,
            dataElements: eightDataElements,
        },
    })
})

Given('the user navigated to the home page', () => {
    cy.visit('localhost:3000')
})

Then('8 data elements should be displayed', () => {
    cy.get('[data-test="data-element-row"]').should('have.length', 8)
})

Then('10 data elements should be displayed', () => {
    cy.get('[data-test="data-element-row"]').should('have.length', 10)
})

Then('data elements should be in order', () => {
    cy.get('@dataElements').then(dataElements => {
        dataElements.forEach((dataElement, index) => {
            const { id, displayName } = dataElement

            cy.get(`
                [data-test="data-element-row"]:nth-child(${index + 1})
                [data-test="data-element-id"]
            `).should('contain', id)

            cy.get(`
                [data-test="data-element-row"]:nth-child(${index + 1})
                [data-test="data-element-displayname"]
            `).should('contain', displayName)
        })
    })
})
