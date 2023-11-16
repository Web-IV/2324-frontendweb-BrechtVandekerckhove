import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useState } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodMaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";
import dayjs from "dayjs";
import useSWR from "swr";
import { getAll, getById } from "../api";
import { MEDEWERKER_ID_KEY } from "../contexts/Auth.context";
import AsyncData from "../components/AsyncData";

const { Title } = Typography;

export default function VoegMaaltijdToe() {
  const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] = useState(true);
  const {
    data: suggesties = [],
    isLoading: suggestiesLoading,
    error: suggestiesError,
  } = useSWR("suggesties", getAll);

  const {
    data: medewerker,
    isLoading: medewerkerLoading,
    error: medewerkerError,
  } = useSWR(
    ["medewerkers", localStorage.getItem(MEDEWERKER_ID_KEY)],
    ([url, id]) => getById(url, id)
  );

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
      maaltijd.suggestieVanDeMaand = suggestieVanDeMaand.omschrijving;
    }
    return maaltijd;
  };
  return (
    <>
      <Title level={1}>Maaltijdkeuze</Title>
      <SuggestieLijst
        suggesties={suggesties}
        isLoading={suggestiesLoading}
        error={suggestiesError}
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
      <AsyncData loading={medewerkerLoading} error={medewerkerError}>
        {" "}
        {!medewerkerError ? (
          <div>
            {warmeMaaltijdFormulier ? (
              <WarmeMaaltijdFormulier
                saveMaaltijd={voegMaaltijdToeAanLocalStorage}
                dienstnaam={medewerker?.dienst.naam}
              />
            ) : (
              <BroodMaaltijdFormulier
                saveMaaltijd={voegMaaltijdToeAanLocalStorage}
                dienstnaam={medewerker?.dienst.naam}
              />
            )}
          </div>
        ) : null}
      </AsyncData>
    </>
  );
}
