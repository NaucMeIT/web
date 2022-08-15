describe("menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
        cy.viewport(1920, 1080)
    })

    it("anchor scrolls", () => {
        cy.get(`[data-cy="menu"]`)
            .children("a")
            .each((a) => {
                cy.wrap(a)
                    .invoke("attr", "href")
                    .then((href) => {
                        if (href.startsWith("/#")) {
                            cy.wrap(a).click()
                        }
                    })
            })
    })
})
