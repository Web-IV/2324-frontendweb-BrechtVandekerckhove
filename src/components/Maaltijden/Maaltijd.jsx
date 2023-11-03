import BroodMaaltijd from "./BroodMaaltijd";
import WarmeMaaltijd from "./WarmeMaaltijd";

export default function Maaltijd({
  id,
  type,
  leverdatum,
  leverplaatsId,
  leverplaats,
  hoofdschotel,
  soep,
  dessert,
  typeSandwiches,
  hartigBeleg,
  zoetBeleg,
  vetstof,
  suggestieVanDeMaandId,
  suggestieVanDeMaandOmschrijving,
  bestellingsnr,
}) {
  const isWarmeMaaltijd = type == "warmeMaaltijd";

  return isWarmeMaaltijd ? (
    <WarmeMaaltijd
      id={id}
      hoofdschotel={hoofdschotel}
      soep={soep}
      dessert={dessert}
      leverdatum={leverdatum}
      leverplaatsId={leverplaatsId}
      leverplaats={leverplaats}
      suggestieVanDeMaandId={suggestieVanDeMaandId}
      suggestieVanDeMaandOmschrijving={suggestieVanDeMaandOmschrijving}
      bestellingsnr={bestellingsnr}
    />
  ) : (
        <BroodMaaltijd
          id={id}
          soep={soep}
          dessert={dessert}
          typeSandwiches={typeSandwiches}
          hartigBeleg={hartigBeleg}
          zoetBeleg={zoetBeleg}
          vetstof={vetstof}
          leverdatum={leverdatum}
          leverplaatsId={leverplaatsId}
          leverplaats={leverplaats}
          bestellingsnr={bestellingsnr}
        />
     
  );
}
