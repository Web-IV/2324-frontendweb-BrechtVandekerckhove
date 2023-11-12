import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";
import dayjs from "dayjs";
import useSWR from "swr";
import { getAll } from "../api";

const { Title } = Typography;

export default function VoegMaaltijdToe() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);
  const {
    data: suggesties = [],
    isLoading,
    error,
  } = useSWR("suggesties", getAll);

  const voegMaaltijdToeAanLocalStorage = (maaltijd) => {
    maaltijd = controleOpSuggestie(maaltijd);
    const bestaandeMaaltijden = JSON.parse(
      localStorage.getItem("maaltijden") || "[]"
    );
    bestaandeMaaltijden.push(maaltijd);
    localStorage.setItem("maaltijden", JSON.stringify(bestaandeMaaltijden));
  };

  const controleOpSuggestie = (maaltijd) => {
    if (maaltijd.hoofdschotel && maaltijd.hoofdschotel.includes("suggestie")) {
      const leverMaand = dayjs(maaltijd.leverdatum).month() + 1;
      const vegie = maaltijd.hoofdschotel.includes("vegetarisch");
      const suggestieVanDeMaand = suggesties.find(
        (suggesties) =>
          suggesties.maand === leverMaand && suggesties.vegie === vegie
      );
      maaltijd.suggestieVanDeMaandId = suggestieVanDeMaand.id;
      maaltijd.suggestieVanDeMaand =
        suggestieVanDeMaand.omschrijving;
    }
    return maaltijd;
  };
  return (
    <>
      <Title level={1}>Maaltijdkeuze</Title>
      <SuggestieLijst
        suggesties={suggesties}
        isLoading={isLoading}
        error={error}
      />
      <Title level={2}>Voeg een maaltijd toe:</Title>
      <p>Maaltijden kunnen tot 10u de dag ervoor besteld worden. </p>
      <Space wrap size="large">
        <Button
          type="primary"
          data-cy="btn_warmeMaaltijd"
          onClick={() => setWarmeMaaltijdFormulier(true)}
          className={warmeMaaltijdFormulier ? "blue" : "blue nonActiveButton"}
          style={{ width: "150px" }}

        >
          Warme maaltijd
        </Button>
        <Button
          type="primary"
          data-cy="btn_broodMaaltijd"
          onClick={() => setWarmeMaaltijdFormulier(false)}
          className={!warmeMaaltijdFormulier ? "blue " : "blue nonActiveButton"}
  
          style={{ width: "150px" }}
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
