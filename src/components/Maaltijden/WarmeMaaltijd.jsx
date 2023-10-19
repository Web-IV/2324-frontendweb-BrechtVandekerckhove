export default function WarmeMaaltijd({
  id,
  hoofdschotel,
  soep,
  dessert,
  suggestieVanDeMaandId,
  bestellingsnr,
}) {
  return (
    
    <>
      <tr>
        <td>Hoofdschotel: {hoofdschotel}</td>
      </tr>
      {suggestieVanDeMaandId? (
        <tr>
          <td>{hoofdschotel}: {suggestieVanDeMaandId}</td>
        </tr>
      ) : null}
      <tr>
        <td>Soep: {soep? "ja":"nee"}</td>
      </tr>
      <tr>
        <td>Dessert: {dessert}</td>
      </tr>
    </>
  );
}
