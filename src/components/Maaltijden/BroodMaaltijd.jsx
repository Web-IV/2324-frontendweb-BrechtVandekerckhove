export default function BroodMaaltijd({
  id,
  soep,
  dessert,
  typeSandwiches,
  hartigBeleg,
  zoetBeleg,
  vetstof,
  bestellingsnr,
}) {
  return (
    <>
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
    </>
  );
}
