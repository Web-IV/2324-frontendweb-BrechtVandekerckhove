
import Bestelling from "../components/Bestellingen/Bestelling";
import AsyncData from "../components/AsyncData";
import useSWR from "swr";
import { getAll, deleteByBestellingsnr } from "../api";
import useSWRMutation from "swr/mutation";
import { Typography } from "antd";

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
  const { trigger: deleteBestelling, error: deleteError } = useSWRMutation(
    "bestellingen",
    deleteByBestellingsnr
  );

  return (
    <>
      <Title>Bestellingen</Title>
      <AsyncData loading={isLoading} error={error || deleteError}>
        {!error ? (
          <BestellingTabel
            bestellingen={bestellingen}
            onDelete={deleteBestelling}
          />
        ) : null}
      </AsyncData>
    </>
  );
}
