import BroodMaaltijd from "./BroodMaaltijd";
import WarmeMaaltijd from "./WarmeMaaltijd";
import { memo } from 'react';

export default memo( function Maaltijd({
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
  suggestieVanDeMaand,
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
      //api = leverplaats.naam  //localstorage = leverplaats
      leverplaats={leverplaats.naam?leverplaats.naam:leverplaats}
      suggestieVanDeMaandId={suggestieVanDeMaandId}
      //api = suggestieVanDeMaand.omschrijving //localstorage = suggestieVanDeMaand
      suggestieVanDeMaandOmschrijving={!suggestieVanDeMaand?null:suggestieVanDeMaand.omschrijving?suggestieVanDeMaand.omschrijving:suggestieVanDeMaand}
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
           //localstorage = leverplaats //api = leverplaats.naam
          leverplaats={leverplaats.naam?leverplaats.naam:leverplaats}
          bestellingsnr={bestellingsnr}
        />
     
  );
}
);