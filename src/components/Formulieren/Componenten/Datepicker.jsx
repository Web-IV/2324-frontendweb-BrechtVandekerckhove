import { DatePicker } from "formik-antd";
import AsyncData from "../../AsyncData";
import useSWR from "swr";
import { getAll } from "../../../api";
import dayjs from "dayjs";

const vandaag = dayjs().startOf("day");
const isVoorTienUur = dayjs().isBefore(vandaag.add(10, "hour"));

export default function Datepicker({
  datacyWaarde,
  huidigeDatumBewerkMaaltijd,
}) {
  const {
    data: leverdata = [],
    isLoading,
    error,
  } = useSWR("bestellingen/leverdata", getAll);

  //leverdata van alle bestellingen ophalen via api
  const leverdataMaaltijdenInBestellingen = leverdata.map((leverdatum) =>
    dayjs(leverdatum)
  );

  //rendering niet efficient, localstorage liefst nog uithalen
  const leverdataReedsMaaltijdGepland = (current) => {
    const dagenInVerledenEnVandaagEnEvtMorgen = isVoorTienUur
      ? current < dayjs().endOf("day")
      : current < dayjs().endOf("day").add(1, "day");

    //maaltijden uit localstorage ophalen, leverdatums uithalen
    const leverdataMaaltijdenInWinkelmandje = JSON.parse(
      localStorage.getItem("maaltijden") || "[]"
    ).reduce((acc, maaltijd) => {
      acc.push(dayjs(maaltijd.leverdatum));
      return acc;
    }, []);
    if (huidigeDatumBewerkMaaltijd) {
      const index = leverdataMaaltijdenInWinkelmandje.indexOf(
        huidigeDatumBewerkMaaltijd
      );
      leverdataMaaltijdenInWinkelmandje.splice(index, 1);
    }

    return (
      (current && dagenInVerledenEnVandaagEnEvtMorgen) ||
      leverdataMaaltijdenInWinkelmandje.some((date) =>
        current.isSame(date, "day")
      ) ||
      leverdataMaaltijdenInBestellingen.some((date) =>
        current.isSame(date, "day")
      )
    );
  };
  return (
    <AsyncData loading={isLoading} error={error}>
      {!error ? (
        <DatePicker
          name="leverdatum"
          data-cy={datacyWaarde}
          format="DD-MM-YYYY"
          disabledDate={leverdataReedsMaaltijdGepland}
          placeholder="Selecteer een datum"
          style={{ width: "100%" }}
        />
      ) : null}
    </AsyncData>
  );
}
