import { dateConverter } from "../Bestellingen/Bestelling";
import { memo } from "react";

export default memo(function BroodMaaltijd({
  soep,
  dessert,
  typeSandwiches,
  hartigBeleg,
  zoetBeleg,
  vetstof,
  leverdatum,
  leverplaats,
}) {
  return (
    <table data-cy="broodMaaltijd">
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th data-cy="broodMaaltijd_leverdatum_typeMaaltijd">
            {dateConverter(leverdatum)}: broodmaaltijd
          </th>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_leverplaats">
            Leverplaats: {leverplaats}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-cy="broodMaaltijd_sandwiches">
            Sandwiches: {typeSandwiches}
          </td>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_hartigBeleg">
            Hartig beleg: {hartigBeleg}
          </td>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_zoetBeleg">Zoet beleg: {zoetBeleg}</td>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_vetstof">Vetstof: {vetstof}</td>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_soep">Soep: {soep}</td>
        </tr>
        <tr>
          <td data-cy="broodMaaltijd_dessert">Dessert: {dessert}</td>
        </tr>
      </tbody>
    </table>
  );
});
