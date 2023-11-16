import { recurse } from "cypress-recurse";

describe("voeg warme maaltijd toe aan winkelmandje en verwijder terug", () => {
  beforeEach(() => {
    cy.login("brecht.vandekerckhove@student.hogent.be", "12345678");
  });

  it("warme maaltijd toegevoegd", () => {
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

    //25-04-2024 selecteren als leverdatum
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
        if (!n.includes("Apr")) {
          cy.get(".ant-picker-header-next-btn").click();
          return false;
        }
      },
      { timeout: 10000 }
    );
    cy.get(".ant-picker-cell-inner").contains("25").click();

    cy.get("[data-cy=select_warmeMaaltijd_leverplaats]").click();
    cy.contains("CHI08").click();
    cy.get("[data-cy=submit_warmeMaaltijd]").click();

    //winkelmandje
    cy.get("[data-cy=button_winkelmandje]").click();
    cy.get("[data-cy=warmeMaaltijd_leverdatum_typeMaaltijd]")
      .invoke("text")
      .should("eq", "25-4-2024: warme maaltijd");
    cy.get("[data-cy=warmeMaaltijd_leverplaats]")
      .invoke("text")
      .should("contain", "CHI08");
    cy.get("[data-cy=warmeMaaltijd_hoofdschotel]")
      .invoke("text")
      .should("contain", "suggestie");
    cy.get("[data-cy=warmeMaaltijd_soep]")
      .invoke("text")
      .should("contain", "geen soep");
    cy.get("[data-cy=warmeMaaltijd_dessert]")
      .invoke("text")
      .should("contain", "fruit");
    cy.get("[data-cy=warmeMaaltijd_suggestieVanDeMaandOmschrijving]")
      .invoke("text")
      .should("contain", "lamskoteletten met mintsaus");
    cy.get("[data-cy=aantalMaaltijden]")
      .invoke("text")
      .should("eq", "Aantal maaltijden: 1");

    //verwijderen
    cy.get("[data-cy=btn_deleteMaaltijd]").click();
    cy.get("[data-cy=warmeMaaltijd]").should("have.length", 0);
    cy.get("[data-cy=aantalMaaltijden]")
      .invoke("text")
      .should("eq", "Aantal maaltijden: 0");
  });
});
