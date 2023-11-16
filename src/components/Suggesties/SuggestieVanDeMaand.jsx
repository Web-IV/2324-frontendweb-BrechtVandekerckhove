export default function SuggestieVanDeMaand({
  maand,
  vegie,
  omschrijving,
}) {
  const maandNamen = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  return (
    <p>
      {vegie ? "Vegatarische s" : "S"}uggestie {maandNamen[maand - 1]}:{" "}
      {omschrijving}
    </p>
  );
}
