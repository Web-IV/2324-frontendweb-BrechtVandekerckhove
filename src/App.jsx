import React, { useEffect, useState } from "react";
import Maaltijd from "./components/Maaltijden/Maaltijd";
import MAALTIJDEN from "./api/mock_data_maaltijden";
import BroodMaaltijdFormulier from "./components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "./components/Formulieren/WarmeMaaltijdFormulier";
import Bestellinglijst from "./components/Bestellingen/Bestellinglijst";
import SuggestieLijst from "./components/Suggesties/SuggestieLijst";
import { Space, Button } from "antd";

function App() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);
  return (
    <>
      <h1>Maaltijden</h1>
      {MAALTIJDEN.map((maaltijd) => (
        <Maaltijd key={maaltijd.id} {...maaltijd} />
      ))}
      <Bestellinglijst />

      <SuggestieLijst />
      <Space size={150}>
        <Button
          size="large"
          type="primary"
          onClick={() => setWarmeMaaltijdFormulier(true)}
        >
          Warme maaltijd
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => setWarmeMaaltijdFormulier(false)}
        >
          Broodmaaltijd
        </Button>
      </Space>
      <div>
        {warmeMaaltijdFormulier ? (
          <WarmeMaaltijdFormulier />
        ) : (
          <BroodMaaltijdFormulier />
        )}
      </div>
    </>
  );
}
export default App;
