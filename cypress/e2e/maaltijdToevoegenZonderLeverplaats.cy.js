import { recurse } from "cypress-recurse";

describe("maaltijd toevoegen zonder leverplaats: foutboodschap en geen niet toegevoegd aan winkelmandje", () => {
  beforeEach(() => {
    cy.login("brecht.vandekerckhove@student.hogent.be", "12345678");
  });
  
  it("foutboodschap en 0 maaltijden in winkelmandje", () => {
    cy.visit("http://localhost:5173");

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

    //25-02-2024 selecteren als leverdatum
    cy.get("[data-cy=select_warmeMaaltijd_leverdatum]").click();
    recurse(
      () => cy.get(".ant-picker-year-btn").invoke("text"),
      (n) => {
        if (!n.includes("2024")) {
          cy.get(".ant-picker-header-next-btn").click();
          return false;
        }
      }
    );
    recurse(
      () => cy.get(".ant-picker-month-btn").invoke("text"),
      (n) => {
        if (!n.includes("Feb")) {
          cy.get(".ant-picker-header-next-btn").click();
          return false;
        }
      },
      { timeout: 10000 }
    );
    cy.get(".ant-picker-cell-inner").contains("25").click();

    cy.get("[data-cy=submit_warmeMaaltijd]").click();
    cy.get(".ant-form-item-explain-error")
      .invoke("text")
      .should("eq", "Leverplaats is verplicht");

    //winkelmandje
    cy.get("[data-cy=button_winkelmandje]").click();
    cy.get("[data-cy=aantalMaaltijden]")
      .invoke("text")
      .should("eq", "Aantal maaltijden: 0");
  });
});
