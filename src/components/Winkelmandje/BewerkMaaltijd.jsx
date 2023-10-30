import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Button, Space } from "antd";
import BroodMaaltijdFormulier from "../Formulieren/BroodmaaltijdFormulier";
import WarmeMaaltijdFormulier from "../Formulieren/WarmeMaaltijdFormulier";
import NotFound from "../../pages/NotFound";

const { Title } = Typography;


export default function BewerkMaaltijd() {
  const { id: index } = useParams();
  const indexAsNumber = Number(index);
  const bestaandeMaaltijden = JSON.parse(
    localStorage.getItem("maaltijden") || "[]"
  );
  const teBewerkenMaaltijd = bestaandeMaaltijden[indexAsNumber];

  if (teBewerkenMaaltijd === undefined) {
    return <NotFound />;
  } else {
    const isWarmeMaaltijd = teBewerkenMaaltijd.type === "warmeMaaltijd";
    const [warmeMaaltijdFormulier, setWarmeMaaltijdFormulier] =
      useState(isWarmeMaaltijd);
    const initialValues = { ...teBewerkenMaaltijd };
    const navigate = useNavigate();
    const bewerkMaaltijdInLocalStorage = (maaltijd) => {
      bestaandeMaaltijden[indexAsNumber]= maaltijd;
      localStorage.setItem("maaltijden", JSON.stringify(bestaandeMaaltijden));
      navigate("/winkelmandje", { replace: true });
    };

    return (
      <>
        <Title level={2}>Bewerk maaltijd</Title>
        <p>Maaltijden kunnen tot 10u de dag ervoor besteld worden. </p>
        <Space size={150}>
          <Button
            type="primary"
            className={warmeMaaltijdFormulier ? "blue" : "blue nonActiveButton"}
            onClick={() => setWarmeMaaltijdFormulier(true)}
          >
            Warme maaltijd
          </Button>
          <Button
            type="primary"
            className={!warmeMaaltijdFormulier ? "blue" : "blue nonActiveButton"}
            onClick={() => setWarmeMaaltijdFormulier(false)}
          >
            Broodmaaltijd
          </Button>
        </Space>
        <div>
          {warmeMaaltijdFormulier ? (
            <WarmeMaaltijdFormulier
              saveMaaltijd={bewerkMaaltijdInLocalStorage}
              initialValues={isWarmeMaaltijd?initialValues:null}
            />
          ) : (
            <BroodMaaltijdFormulier
              saveMaaltijd={bewerkMaaltijdInLocalStorage}
              initialValues={!isWarmeMaaltijd?initialValues:null}
            />
          )}
        </div>
      </>
    );
  }
}
