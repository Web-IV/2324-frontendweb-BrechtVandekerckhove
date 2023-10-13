import BroodMaaltijd from "./BroodMaaltijd";
import WarmeMaaltijd from "./WarmeMaaltijd";

export default function Maaltijd({
  id,
  type,
  leverdatum,
  hoofdschotel,
  soep,
  dessert,
  typeSandwiches,
  hartigBeleg,
  zoetBeleg,
  vetstof,
  suggestieVanDeMaandId,
  bestellingsnr,
}) {
  const isWarmeMaaltijd = type == "warmeMaaltijd";

  return isWarmeMaaltijd ? (
    <table>
      <thead>
        <tr>
          <th>Warme maaltijd</th>
        </tr>
      </thead>
      <tbody>
        <WarmeMaaltijd
          id={id}
          hoofdschotel={hoofdschotel}
          soep={soep}
          dessert={dessert}
          suggestieVanDeMaandId={suggestieVanDeMaandId}
          bestellingsnr={bestellingsnr}
        />
      </tbody>
      <tfoot>
        <tr>
          <td>Leverdatum: {leverdatum}</td>
        </tr>
      </tfoot>
    </table>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Broodmaaltijd</th>
        </tr>
      </thead>
      <tbody>
        <BroodMaaltijd
          id={id}
          soep={soep}
          dessert={dessert}
          typeSandwiches={typeSandwiches}
          hartigBeleg={hartigBeleg}
          zoetBeleg={zoetBeleg}
          vetstof={vetstof}
          bestellingsnr={bestellingsnr}
        />
      </tbody>
      <tfoot>
        <tr>
          <td>Leverdatum: {leverdatum}</td>
        </tr>
      </tfoot>
    </table>
  );
}
