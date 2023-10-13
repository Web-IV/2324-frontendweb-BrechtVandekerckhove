export default function WarmeMaaltijd({
  id,
  hoofdschotel,
  soep,
  dessert,
  suggestieVanDeMaand,
}) {
  return (
    <>
      <tr>
        <td>Hoofdschotel: {hoofdschotel}</td>
      </tr>
      {suggestieVanDeMaand ? (
        <tr>
          <td>{hoofdschotel}: {suggestieVanDeMaand}</td>
        </tr>
      ) : null}
      <tr>
        <td>Soep: {soep}</td>
      </tr>
      <tr>
        <td>Dessert: {dessert}</td>
      </tr>
    </>
  );
}
