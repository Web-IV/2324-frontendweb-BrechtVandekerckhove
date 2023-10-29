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
  sugestieVanDeMaandOmschrijving,
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
      suggestieVanDeMaandId={suggestieVanDeMaandId}
      sugestieVanDeMaandOmschrijving={sugestieVanDeMaandOmschrijving}
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
          bestellingsnr={bestellingsnr}
        />
     
  );
}
