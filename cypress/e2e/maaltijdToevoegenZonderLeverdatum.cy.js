import { recurse } from "cypress-recurse";

describe("maaltijd toevoegen zonder leverdatum: foutboodschap en geen niet toegevoegd aan winkelmandje", () => {
  it("foutboodschap en 0 maaltijden in winkelmandje", () => {
    cy.visit("http://localhost:5173/");

    cy.get("[data-cy=select_warmeMaaltijd_hoofdschotel]").click();
    cy.get(".ant-select-dropdown").within(() => {
      cy.contains("suggestie").click();
    });
    cy.get("[data-cy=select_warmeMaaltijd_soep]").click();

    cy.get(".ant-select-dropdown")
      .eq(1)
      .within(() => {
        cy.contains("geen soep").click();
      });

    cy.get("[data-cy=select_warmeMaaltijd_dessert]").click();
    cy.get(".ant-select-dropdown")
      .eq(2)
      .within(() => {
        cy.contains("fruit").click();
      });

    cy.get("[data-cy=select_warmeMaaltijd_leverplaats]").click();
    cy.contains("SPD01").click();

    cy.get("[data-cy=submit_warmeMaaltijd]").click();
    cy.get(".ant-form-item-explain-error")
      .invoke("text")
      .should("eq", "Leverdatum is verplicht");

    //winkelmandje
    cy.get("[data-cy=button_winkelmandje]").click();
    cy.get("[data-cy=aantalMaaltijden]")
      .invoke("text")
      .should("eq", "Aantal maaltijden: 0");
  });
});
