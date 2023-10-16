import React, { useEffect, useState } from "react";
import Maaltijd from "./components/Maaltijden/Maaltijd";
import MAALTIJDEN from "./api/mock_data_maaltijden";
import SUGGESTIES from "./api/mock_data_suggesties";
import Bestelling from "./components/Bestellingen/Bestelling";
import SuggestieVanDeMaand from "./components/SuggestieVanDeMaand";
import BroodMaaltijdFormulier from "./components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "./components/Formulieren/WarmeMaaltijdFormulier";
import Bestellinglijst from "./components/Bestellingen/Bestellinglijst";

function App() {
  return (
    <>
      <h1>Maaltijden</h1>
      {MAALTIJDEN.map((maaltijd) => (
        <Maaltijd key={maaltijd.id} {...maaltijd} />
      ))}
      <Bestellinglijst />

      <h1>Suggesties</h1>
      {SUGGESTIES.map((suggestie) => (
        <SuggestieVanDeMaand key={suggestie.id} {...suggestie} />
      ))}
      <h1>Formulieren</h1>
      <BroodMaaltijdFormulier />
      <WarmeMaaltijdFormulier />
    </>
  );
}
export default App;
