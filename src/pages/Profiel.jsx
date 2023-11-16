import { Typography } from "antd";
import AsyncData from "../components/AsyncData";
import useSWR from "swr";
import { MEDEWERKER_ID_KEY } from "../contexts/Auth.context";
import { getAll, getById } from "../api";
import PersoonlijkeGegevensFormulier from "../components/Formulieren/PersoonlijkeGegevensFormulier";
import WijzigWachtwoordFormulier from "../components/Formulieren/WijzigWachtwoordFormulier";

const { Title } = Typography;

export default function Profiel() {

  const {
    data: diensten = [],
    isLoading: dienstenLoading,
    error: dienstenError,
  } = useSWR("diensten", getAll);

  const {
    data: medewerker,
    isLoading: medewerkerLoading,
    error: medewerkerError,
  } = useSWR(
    ["medewerkers", localStorage.getItem(MEDEWERKER_ID_KEY)],
    ([url, id]) => getById(url, id)
  );


  return (
    <>
      <Title level={1}>Mijn profiel</Title>
      <AsyncData
        loading={dienstenLoading || medewerkerLoading}
        error={dienstenError || medewerkerError}
      >
        {!(dienstenError || medewerkerError) ? (
          <>
            <PersoonlijkeGegevensFormulier
              medewerker={medewerker}
              diensten={diensten}

            />
            <WijzigWachtwoordFormulier />
          </>
        ) : null}
      </AsyncData>
    </>
  );
}
