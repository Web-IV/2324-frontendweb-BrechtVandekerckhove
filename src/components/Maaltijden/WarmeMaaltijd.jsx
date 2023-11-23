import { dateConverter } from "../Bestellingen/Bestelling";
import { memo } from 'react';


export default memo(function WarmeMaaltijd({
  hoofdschotel,
  soep,
  dessert,
  leverdatum,
  leverplaats,
  suggestieVanDeMaandOmschrijving,
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
});
