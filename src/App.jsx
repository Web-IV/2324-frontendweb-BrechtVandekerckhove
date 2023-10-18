import React, { useEffect, useState } from "react";
import Maaltijd from "./components/Maaltijden/Maaltijd";
import MAALTIJDEN from "./api/mock_data_maaltijden";
import BroodMaaltijdFormulier from "./components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "./components/Formulieren/WarmeMaaltijdFormulier";
import Bestellinglijst from "./components/Bestellingen/Bestellinglijst";
import SuggestieLijst from "./components/Suggesties/SuggestieLijst";

function App() {
  return (
    <>
      <h1>Maaltijden</h1>
      {MAALTIJDEN.map((maaltijd) => (
        <Maaltijd key={maaltijd.id} {...maaltijd} />
      ))}
      <Bestellinglijst />

      <SuggestieLijst />
      <h1>Formulieren</h1>
      <BroodMaaltijdFormulier />
      <WarmeMaaltijdFormulier />
    </>
  );
}
export default App;
