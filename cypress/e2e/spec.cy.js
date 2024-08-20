describe("e2e tests over home page", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("should render correct number of word cards when search is performed", function () {
    cy.get(':nth-child(3) > a').click()
  });
});