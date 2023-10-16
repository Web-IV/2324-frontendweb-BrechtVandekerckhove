import Bestelling from "./Bestelling";
import AsyncData from "../AsyncData";
import useSWR from "swr";
import { getAll, deleteByBestellingsnr } from "../../api";
import useSWRMutation from "swr/mutation";

function BestellingTabel({ bestellingen, onDelete }) {
  return bestellingen.map((bestelling) => (
    <Bestelling key={bestelling.bestellingsnr} onDelete={onDelete} {...bestelling} />
  ));
}

export default function Bestellinglijst() {
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
      <h1>Bestellingen</h1>
      <AsyncData loading={isLoading} error={error || deleteError}>
        {!error ? (
          <BestellingTabel bestellingen={bestellingen} onDelete={deleteBestelling} />
        ) : null}
      </AsyncData>
    </>
  );
}
