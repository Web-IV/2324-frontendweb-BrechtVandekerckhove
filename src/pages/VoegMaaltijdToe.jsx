import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useState } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";

const { Title } = Typography;

const voegMaaltijdToeAanLocalStorage = (maaltijd) => {
  const bestaandeMaaltijden = JSON.parse(
    localStorage.getItem("maaltijden") || "[]"
  );
  bestaandeMaaltijden.push(maaltijd);
  localStorage.setItem("maaltijden", JSON.stringify(bestaandeMaaltijden));
};

export default function VoegMaaltijdToe() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);

  return (
    <>
      <Title level={1}>Maaltijdkeuze</Title>
      <SuggestieLijst />
      <Title level={2}>Voeg een maaltijd toe:</Title>
      <p>Maaltijden kunnen tot 10u de dag ervoor besteld worden. </p>
      <Space size={150}>
        <Button
          type="primary"
          className="blue"
          onClick={() => setWarmeMaaltijdFormulier(true)}
        >
          Warme maaltijd
        </Button>
        <Button
          type="primary"
          className="blue"
          onClick={() => setWarmeMaaltijdFormulier(false)}
        >
          Broodmaaltijd
        </Button>
      </Space>
      <div>
        {warmeMaaltijdFormulier ? (
          <WarmeMaaltijdFormulier
            saveMaaltijd={voegMaaltijdToeAanLocalStorage}
          />
        ) : (
          <BroodMaaltijdFormulier
            saveMaaltijd={voegMaaltijdToeAanLocalStorage}
          />
        )}
      </div>
    </>
  );
}
