import { dateConverter } from "../Bestellingen/Bestelling";

export default function BroodMaaltijd({
  id,
  soep,
  dessert,
  typeSandwiches,
  hartigBeleg,
  zoetBeleg,
  vetstof,
  leverdatum,
  bestellingsnr,
}) {
  return (
    <table>
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th>{dateConverter(leverdatum)}: broodmaaltijd</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sandwiches: {typeSandwiches}</td>
        </tr>
        <tr>
          <td>Hartig beleg: {hartigBeleg}</td>
        </tr>
        <tr>
          <td>Zoet beleg: {zoetBeleg}</td>
        </tr>
        <tr>
          <td>Vetstof: {vetstof}</td>
        </tr>
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
