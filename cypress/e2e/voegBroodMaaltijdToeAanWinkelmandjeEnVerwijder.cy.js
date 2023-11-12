import { recurse } from "cypress-recurse";

describe("voeg  broodmaaltijd toe aan winkelmandje en verwijder terug", () => {
  it("broodmaaltijd toegevoegd", () => {
    cy.visit("http://localhost:5173/");

    cy.get("[data-cy=btn_broodMaaltijd]").click();
    cy.get("[data-cy=select_broodMaaltijd_sandwiches]").click();
    cy.get(".ant-select-dropdown").within(() => {
      cy.contains("bruin").click();
    });
    cy.get("[data-cy=select_broodMaaltijd_soep]").click();

    cy.get(".ant-select-dropdown")
      .eq(1)
      .within(() => {
        cy.contains("dagsoep").click();
      });

    cy.get("[data-cy=select_broodMaaltijd_hartigBeleg]").click();
    cy.get(".ant-select-dropdown")
      .eq(2)
      .within(() => {
        cy.contains("surimisalade").click();
      });
    cy.get("[data-cy=select_broodMaaltijd_zoetBeleg]").click();
    cy.get(".ant-select-dropdown")
      .eq(3)
      .within(() => {
        cy.contains("speculoospasta").click();
      });
    cy.get("[data-cy=select_broodMaaltijd_vetstof]").click();
    cy.get(".ant-select-dropdown")
      .eq(4)
      .within(() => {
        cy.contains("geen vetstof").click();
      });
    cy.get("[data-cy=select_broodMaaltijd_dessert]").click();
    cy.get(".ant-select-dropdown")
      .eq(5)
      .within(() => {
        cy.contains("zuivel").click();
      });

    //19-02-2024 selecteren als leverdatum
    cy.get("[data-cy=select_broodMaaltijd_leverdatum]").click();
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
    cy.get(".ant-picker-cell-inner").contains("19").click();

    cy.get("[data-cy=select_broodMaaltijd_leverplaats]").click();
    cy.contains("SPD01").click();
    cy.get("[data-cy=submit_broodMaaltijd]").click();

    //winkelmandje
    cy.get("[data-cy=button_winkelmandje]").click();
    cy.get("[data-cy=broodMaaltijd_leverdatum_typeMaaltijd]")
      .invoke("text")
      .should("eq", "19-2-2024: broodmaaltijd");
    cy.get("[data-cy=broodMaaltijd_leverplaats]")
      .invoke("text")
      .should("contain", "SPD01");
    cy.get("[data-cy=broodMaaltijd_sandwiches]")
      .invoke("text")
      .should("contain", "bruin");
      cy.get("[data-cy=broodMaaltijd_hartigBeleg]")
      .invoke("text")
      .should("contain", "surimisalade");
      cy.get("[data-cy=broodMaaltijd_zoetBeleg]")
      .invoke("text")
      .should("contain", "speculoospasta");
      cy.get("[data-cy=broodMaaltijd_vetstof]")
      .invoke("text")
      .should("contain", "geen vetstof");
    cy.get("[data-cy=broodMaaltijd_soep]")
      .invoke("text")
      .should("contain", "dagsoep");
    cy.get("[data-cy=broodMaaltijd_dessert]")
      .invoke("text")
      .should("contain", "zuivel");
    cy.get("[data-cy=aantalMaaltijden]").invoke("text").should("eq","Aantal maaltijden: 1")
   

    //verwijderen
    cy.get("[data-cy=btn_deleteMaaltijd]").click();
    cy.get("[data-cy=broodMaaltijd]").should("have.length", 0);
    cy.get("[data-cy=aantalMaaltijden]").invoke("text").should("eq","Aantal maaltijden: 0")
  });
});
