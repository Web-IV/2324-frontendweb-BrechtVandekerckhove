
import SuggestieVanDeMaand from "./SuggestieVanDeMaand";
import { Typography } from "antd";
import AsyncData from "../AsyncData";
const { Title } = Typography;


const huidigeMaand = new Date().getMonth() + 1;
const komendeDrieMaanden = [
  huidigeMaand,
  huidigeMaand + 1 > 12 ? (huidigeMaand + 1) % 12 : huidigeMaand + 1,
  huidigeMaand + 2 > 12 ? (huidigeMaand + 2) % 12 : huidigeMaand + 2,
];

const maandNummerOmzettenNaarMaandString = (maandNummer) => {
  const maandString = new Date(0, maandNummer - 1, 1).toLocaleString(
    "default",
    {
      month: "long",
    }
  );
  return maandString.charAt(0).toLocaleUpperCase() + maandString.slice(1);
};

export default function SuggestieLijst({suggesties, isLoading, error}) {
 
  return (
    <>
      <Title level={2}>Suggesties komende maanden:</Title>
      <AsyncData loading={isLoading} error={error}>
        {!error
          ? suggesties
              .filter((suggestie) =>
                komendeDrieMaanden.includes(suggestie.maand)
              )
              .sort((a, b) => {
                a = (a.maand - huidigeMaand + 12) % 12;
                b = (b.maand - huidigeMaand + 12) % 12;
                return a - b;
              })
              .map((suggestie, index) => (
                <div key={suggestie.id}>
                  {/*Per 2 suggesties maand weergeven*/}
                  {index % 2 == 0 ? (
                    <Title level={3}>
                      {maandNummerOmzettenNaarMaandString(suggestie.maand)}
                    </Title>
                  ) : null}
                  <SuggestieVanDeMaand key={suggestie.id} {...suggestie} />
                </div>
              ))
          : null}
      </AsyncData>
    </>
  );
}
