import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useState } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";

const { Title } = Typography;

export default function VoegMaaltijdToe() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);
  return (
    <>
    <Title level={1}>Maaltijdkeuze</Title>
      <SuggestieLijst />
      <Title level={2}>Voeg een maaltijd toe:</Title>

      <Space size={150}>
        <Button
          size="large"
          type="primary"
          className="blue"
          onClick={() => setWarmeMaaltijdFormulier(true)}
        >
          Warme maaltijd
        </Button>
        <Button
          size="large"
          type="primary"
          className="blue"
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
