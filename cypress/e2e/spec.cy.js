describe("mijn eerste test", () => {
  it("draait de applicatie", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").should("exist");
  });
  it("should login", () => {
    cy.login("brecht.vandekerckhove@student.hogent.be", "12345678");
    cy.get("h1").invoke("text").should("contains", "Maaltijdkeuze");
  });

  it("should logout", () => {
    cy.login("brecht.vandekerckhove@student.hogent.be", "12345678");
    cy.logout();
    cy.get(".ant-result-title")
      .invoke("text")
      .should("contains", "Je bent succesvol uitgelogd");
  });
});
