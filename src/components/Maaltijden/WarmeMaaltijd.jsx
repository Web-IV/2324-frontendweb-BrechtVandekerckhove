import { dateConverter } from "../Bestellingen/Bestelling";
import dayjs from "dayjs";
import useSWR from "swr";
import { getAll } from "../../api";

export default function WarmeMaaltijd({
  id,
  hoofdschotel,
  soep,
  dessert,
  leverdatum,
  suggestieVanDeMaandId,
  sugestieVanDeMaandOmschrijving,
  bestellingsnr,
}) {

  return (
    <table>
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th>{dateConverter(leverdatum)}: warme maaltijd</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hoofdschotel: {hoofdschotel}</td>
        </tr>
        {suggestieVanDeMaandId ? (
          <tr>
            <td>
              {hoofdschotel}: {suggestieVanDeMaandId}
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
