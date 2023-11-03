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
    <table>
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th>{dateConverter(leverdatum)}: warme maaltijd</th>
        </tr>
        <tr>
          <td>Leverplaats: {leverplaats}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hoofdschotel: {hoofdschotel}</td>
        </tr>
        {suggestieVanDeMaandOmschrijving ? (
          <tr>
            <td>
              Omschrijving: {suggestieVanDeMaandOmschrijving}
            </td>
          </tr>
        ) : null}
        <tr>
          <td>Soep: {soep}</td>
        </tr>
        <tr>
          <td>Dessert: {dessert}</td>
        </tr>
      </tbody>
    </table>
  );
}
