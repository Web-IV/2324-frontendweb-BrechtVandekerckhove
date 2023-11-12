import { recurse } from "cypress-recurse";

describe("voeg broodmaaltijd toe aan winkelmandje en bewerk zoet beleg", () => {
  it("zoet beleg aangepast", () => {
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
    cy.get("[data-cy=broodMaaltijd_zoetBeleg]")
    .invoke("text")
    .should("contain", "speculoospasta");
    cy.get("[data-cy=btn_bewerkMaaltijd]").click();

    //bewerk maaltijd
    cy.get("[data-cy=select_broodMaaltijd_zoetBeleg]").click();
    cy.get(".ant-select-dropdown")
    .within(() => {
      cy.contains("choco").click();
    });
    cy.get("[data-cy=submit_broodMaaltijd]").click();

    //winkelmandje
    cy.get("[data-cy=broodMaaltijd_zoetBeleg]")
    .invoke("text")
    .should("contain", "choco");
    cy.get("[data-cy=aantalMaaltijden]").invoke("text").should("eq","Aantal maaltijden: 1")
  });
});
