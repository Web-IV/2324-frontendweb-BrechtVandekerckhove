import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useState } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

const voegMaaltijdToeAanLocalStorage = (maaltijd) => {
  const bestaandeMaaltijden = JSON.parse(
    localStorage.getItem("maaltijden") || "[]"
  );
  bestaandeMaaltijden.push(maaltijd);
  localStorage.setItem("maaltijden", JSON.stringify(bestaandeMaaltijden));
};
const dataReedsMaaltijdGepland = (current) => {
  const dagenInVerledenEnVandaag = current < dayjs().endOf("day");
  //hier dynamisch instellen
  const dagenReedsMaaltijd = [dayjs("2023-10-27"), dayjs("2023-10-24")];

  return (
    (current && dagenInVerledenEnVandaag) ||
    dagenReedsMaaltijd.some((date) => current.isSame(date, "day"))
  );
};

export default function VoegMaaltijdToe() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);
  return (
    <>
      <Title level={1}>Maaltijdkeuze</Title>
      <SuggestieLijst />
      <Title level={2}>Voeg een maaltijd toe:</Title>

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
            disabledDate={dataReedsMaaltijdGepland}
          />
        ) : (
          <BroodMaaltijdFormulier
            saveMaaltijd={voegMaaltijdToeAanLocalStorage}
            disabledDate={dataReedsMaaltijdGepland}
          />
        )}
      </div>
    </>
  );
}
