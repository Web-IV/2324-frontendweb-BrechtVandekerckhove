import { recurse } from "cypress-recurse";

describe("Bestelling overzicht", () => {
  it("Toont 2 bestellingen met totaal 3 maaltijden in", () => {
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bestellingen", {
      fixture: "bestellingen.json",
    });
    //aantal maaltijden
    cy.get(".ant-table-tbody").should("have.length", 3);
    // aantal bestellingen
    cy.get("[data-cy=bestelling]").should("have.length", 2);
  });
  it("laadindicator wordt getoond bij trage response", () => {
    cy.intercept("http://localhost:9000/api/bestellingen", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");
    cy.visit("http://localhost:5173/bestellingen");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });
  it("zoekfunctie toont correcte maaltijd en correct naam", () => {
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bestellingen", {
      fixture: "bestellingen.json",
    });
    //18-4-2024 selecteren als leverdatum
    cy.get("[data-cy=select_leverdatumMaaltijd]").click();
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
      { timeout: 20000 }
    );
    cy.get(".ant-picker-cell-inner").contains("18").click();
    //nog geen maaltijd
    cy.get("[data-cy=tabel_maaltijden]")
      .should("exist")
      .contains("Geen maaltijden")
      .should("exist");
    cy.get("[data-cy=btn_zoekMaaltijd]").click();
    //wel correcte maaltijd
    cy.get("[data-cy=tabel_maaltijden]")
      .find("[data-cy=warmeMaaltijd_leverdatum_typeMaaltijd]")
      .invoke("text")
      .should("eq", "18-4-2024: warme maaltijd");
    cy.get(".ant-table-cell.medewerker").eq(1).invoke("text").should("eq","Brecht Vandekerckhove");
  });

  it("zoekfunctie toont twee correcte maaltijden en correcte namen", () => {
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bestellingen", {
      fixture: "bestellingen.json",
    });

    //18-4-2024 selecteren als leverdatum
    cy.get("[data-cy=select_leverdatumMaaltijd]").click();
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
        if (!n.includes("Nov")) {
          cy.get(".ant-picker-header-next-btn").click();
          return false;
        }
      },
      { timeout: 20000 }
    );
    cy.get(".ant-picker-cell-inner").contains("21").click();
    //nog geen maaltijd
    cy.get("[data-cy=tabel_maaltijden]")
      .should("exist")
      .contains("Geen maaltijden")
      .should("exist");
    cy.get("[data-cy=btn_zoekMaaltijd]").click();
    //twee correcte maaltijden
    cy.get("[data-cy=tabel_maaltijden]")
      .find("[data-cy=warmeMaaltijd_leverdatum_typeMaaltijd]")
      .invoke("text")
      .should("eq", "21-11-2024: warme maaltijd");
    cy.get("[data-cy=tabel_maaltijden]")
      .find("[data-cy=broodMaaltijd_leverdatum_typeMaaltijd]")
      .invoke("text")
      .should("eq", "21-11-2024: broodmaaltijd");
      //correcte namen
      cy.get(".ant-table-cell.medewerker").eq(1).invoke("text").should("eq","Melissa Balcaen");
      cy.get(".ant-table-cell.medewerker").eq(2).invoke("text").should("eq","Brecht Vandekerckhove");
     
  });

  it("zoekfunctie toont geen maaltijd bij leverdatum zonder match", () => {
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bestellingen", {
      fixture: "bestellingen.json",
    });
    //18-4-2024 selecteren als leverdatum
    cy.get("[data-cy=select_leverdatumMaaltijd]").click();
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
    cy.get(".ant-picker-cell-inner").contains("18").click();

    cy.get("[data-cy=btn_zoekMaaltijd]").click();
    //geen maaltijd
    cy.get("[data-cy=tabel_maaltijden]")
      .should("exist")
      .contains("Geen maaltijden")
      .should("exist");
  });

  it("foutboodschap als backend fout geeft bij ophalen bestellingen", () => {
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bestellingen", {
      statusCode: 404,
    });
    cy.get("[data-cy=error]").should("exist");
    cy.get("[data-cy=error]").contains("404")


  });
});
