import SuggestieLijst from "../components/Suggesties/SuggestieLijst";
import { Button, Space } from "antd";
import { useState, useCallback } from "react";
import BroodMaaltijdFormulier from "../components/Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../components/Formulieren/WarmeMaaltijdFormulier";
import { Typography } from "antd";
import dayjs from "dayjs";
import useSWR from "swr";
import { getLeverdataBestellingen } from "../api";
import AsyncData from "../components/AsyncData";

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

  const {
    data: leverdata = [],
    isLoading,
    error,
  } = useSWR("bestellingen/leverdata", getLeverdataBestellingen);

  const leverdataReedsMaaltijdGepland = (current) => {
    const vandaag = dayjs().startOf("day");
    const isVoorTienUur = dayjs().isBefore(vandaag.add(10, "hour"));

    const dagenInVerledenEnVandaagEnEvtMorgen = isVoorTienUur
      ? current < dayjs().endOf("day")
      : current < dayjs().endOf("day").add(1, "day");

    //maaltijden uit localstorage ophalen, leverdatums uithalen
    const leverdataMaaltijdenInWinkelmandje = JSON.parse(
      localStorage.getItem("maaltijden") || "[]"
    ).reduce((acc, maaltijd) => {
      acc.push(dayjs(maaltijd.leverdatum));
      return acc;
    }, []);

    //leverdata van alle bestellingen ophalen via api
    const leverdataMaaltijdenInBestellingen = leverdata.map((leverdatum) =>
      dayjs(leverdatum)
    );

    return (
      (current && dagenInVerledenEnVandaagEnEvtMorgen) ||
      leverdataMaaltijdenInWinkelmandje.some((date) =>
        current.isSame(date, "day")
      ) ||
      leverdataMaaltijdenInBestellingen.some((date) =>
        current.isSame(date, "day")
      )
    );
  };

  return (
    <AsyncData loading={isLoading} error={error}>
      {!error ? (
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
                disabledDate={leverdataReedsMaaltijdGepland}
              />
            ) : (
              <BroodMaaltijdFormulier
                saveMaaltijd={voegMaaltijdToeAanLocalStorage}
                disabledDate={leverdataReedsMaaltijdGepland}
              />
            )}
          </div>
        </>
      ) : null}
    </AsyncData>
  );
}
