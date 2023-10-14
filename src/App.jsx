import React from "react";
import Maaltijd from "./components/Maaltijden/Maaltijd";
import MAALTIJDEN from "./api/mock_data_maaltijden";
import BESTELLINGEN from "./api/mock_data_bestellingen";
import SUGGESTIES from "./api/mock_data_suggesties";
import Bestelling from "./components/Bestellingen/Bestelling";
import SuggestieVanDeMaand from "./components/SuggestieVanDeMaand";
import BroodMaaltijdFormulier from "./components/Formulieren/BroodMaaltijdFormulier"; 
function App() {
  return (
    <>
      <h1>Maaltijden</h1>
      {MAALTIJDEN.map((maaltijd) => (
        <Maaltijd key={maaltijd.id} {...maaltijd} />
      ))}
      <h1>Bestellingen</h1>
      {BESTELLINGEN.map((bestelling) => (
        <Bestelling key={bestelling.bestellingsnr} {...bestelling} />
      ))}

      <h1>Suggesties</h1>
      {SUGGESTIES.map((suggestie) => (
        <SuggestieVanDeMaand key={suggestie.id} {...suggestie} />
      ))}
      <h1>Formulieren</h1>
      <BroodMaaltijdFormulier />
    </>
  );
}
export default App;
