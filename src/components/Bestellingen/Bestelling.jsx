import Maaltijd from "../Maaltijden/Maaltijd";

export default function Bestelling({ bestellingsnr, besteldatum, maaltijden }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Bestelling {bestellingsnr}</th>
        </tr>
        <tr>
          <td>Besteldatum: {besteldatum}</td>
        </tr>
      </thead>
      <tbody>
        {maaltijden.map((maaltijd) => (
          <tr>
            <td>
              <Maaltijd  {...maaltijd} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
