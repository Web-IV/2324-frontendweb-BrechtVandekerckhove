import Bestelling from "../components/Bestellingen/Bestelling";
import AsyncData from "../components/AsyncData";
import useSWR from "swr";
import { getAll, deleteByBestellingsnr } from "../api";
import useSWRMutation from "swr/mutation";
import { Typography, DatePicker, Button } from "antd";
import { useState } from "react";

const { Title } = Typography;

function BestellingTabel({ bestellingen, onDelete }) {
  return bestellingen.map((bestelling) => (
    <Bestelling
      key={bestelling.bestellingsnr}
      onDelete={onDelete}
      {...bestelling}
    />
  ));
}

export default function BestellingOverzicht() {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll);

  const [search, setSearch] = useState();

  const { trigger: deleteBestelling, error: deleteError } = useSWRMutation(
    "bestellingen",
    deleteByBestellingsnr
  );

  let m = null;
  const gefilterdeMaaltijden = (search) => () => {
    m = bestellingen
      .flatMap((bestelling) => bestelling.maaltijden)
      .filter((maaltijd) => maaltijd.leverdatum === search);
  };

  return (
    <>
      <Title>Bestellingen</Title>
      <AsyncData loading={isLoading} error={error || deleteError}>
        {!error ? (
          <>
            {" "}
            <BestellingTabel
              bestellingen={bestellingen}
              onDelete={deleteBestelling}
            />
            <Title level={2}>Zoek maaltijd op leverdatum</Title>
            <DatePicker
              placeholder="Leverdatum"
              onChange={(date) => setSearch(date)}
            />
            <Button onClick={gefilterdeMaaltijden(search)}>Zoek</Button>
            {m === null
              ? null
              : m.map((maaltijd) => (
                  <Maaltijd
                    type={maaltijd.type}
                    leverdatum={maaltijd.leverdatum}
                    hoofdschotel={maaltijd.hoofdschotel}
                    //Formik doet moeilijk over boolean values...
                    soep={maaltijd.soep === "soep" ? true : false}
                    dessert={maaltijd.dessert}
                    typeSandwiches={maaltijd.typeSandwiches}
                    hartigBeleg={maaltijd.hartigBeleg}
                    zoetBeleg={maaltijd.zoetBeleg}
                    vetstof={maaltijd.vetstof === "vetstof" ? true : false}
                    suggestieVanDeMaandId={maaltijd.suggestieVanDeMaandId}
                  />
                ))}
          </>
        ) : null}
      </AsyncData>
    </>
  );
}
