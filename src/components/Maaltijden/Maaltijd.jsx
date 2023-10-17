import BroodMaaltijd from "./BroodMaaltijd";
import WarmeMaaltijd from "./WarmeMaaltijd";
import { dateConverter } from "../Bestellingen/Bestelling";

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
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th>{dateConverter(leverdatum)}: warme maaltijd</th>
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
    </table>
  ) : (
    <table>
      <thead style={{ textAlign: "left" }}>
        <tr>
          <th>{dateConverter(leverdatum)}: broodmaaltijd </th>
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
    </table>
  );
}
