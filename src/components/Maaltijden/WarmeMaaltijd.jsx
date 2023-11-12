import { dateConverter } from "../Bestellingen/Bestelling";
import dayjs from "dayjs";

export default function WarmeMaaltijd({
  id,
  hoofdschotel,
  soep,
  dessert,
  leverdatum,
  leverplaatsId,
  leverplaats,
  suggestieVanDeMaandId,
  suggestieVanDeMaandOmschrijving,
  bestellingsnr,
}) {

  return (
    <table data-cy="warmeMaaltijd">
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th data-cy="warmeMaaltijd_leverdatum_typeMaaltijd">{dateConverter(leverdatum)}: warme maaltijd</th>
        </tr>
        <tr>
          <td data-cy="warmeMaaltijd_leverplaats">Leverplaats: {leverplaats}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-cy="warmeMaaltijd_hoofdschotel">Hoofdschotel: {hoofdschotel}</td>
        </tr>
        {suggestieVanDeMaandOmschrijving ? (
          <tr>
            <td data-cy="warmeMaaltijd_suggestieVanDeMaandOmschrijving">
              Omschrijving: {suggestieVanDeMaandOmschrijving}
            </td>
          </tr>
        ) : null}
        <tr>
          <td data-cy="warmeMaaltijd_soep">Soep: {soep}</td>
        </tr>
        <tr>
          <td data-cy="warmeMaaltijd_dessert">Dessert: {dessert}</td>
        </tr>
      </tbody>
    </table>
  );
}
