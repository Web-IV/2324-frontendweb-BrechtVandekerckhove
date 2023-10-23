import { Row, Col, Button, Typography, Table, Divider, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Maaltijd from "../components/Maaltijden/Maaltijd";
import useSWRMutation from "swr/mutation";
import { save } from "../api";
import Error from "../components/Error";
import { useState } from "react";

//basis code: https://github.com/bilaltahseen/Shoping-Cart-UI-Antdesign/blob/master/src/Pages/Cart.js

const { Title } = Typography;

export default function Winkelmandje() {
  const { trigger: saveBestelling, error: saveError } = useSWRMutation(
    "bestellingen",
    save
  );
  const [maaltijden, setMaaltijden] = useState(
    JSON.parse(localStorage.getItem("maaltijden"))
  );

  const deleteWinkelmandje = () => {
    localStorage.removeItem("maaltijden");
    setMaaltijden(null);
  };

  const deleteMaaltijd = (index) => {
    const maaltijden = JSON.parse(localStorage.getItem("maaltijden"));
    if (index > -1) {
      maaltijden.splice(index, 1);
      localStorage.setItem("maaltijden", JSON.stringify(maaltijden));
    }
    setMaaltijden(maaltijden);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Actie",
      dataIndex: "actie",
      key: "actie",
      render: (text, record, index) => (
        <div>
          <div>
            <Button danger onClick={() => deleteMaaltijd(index)}>
              <DeleteOutlined />
              Verwijder
            </Button>
          </div>
          <div>
            <Button type="default" style={{ marginTop: "10px" }}>
              <EditOutlined />
              Bewerk
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Title level={1}>Winkelmandje</Title>
      <Title level={2}>
        Aantal maaltijden: {maaltijden ? maaltijden.length : 0}
      </Title>

      <br></br>
      <Table
        columns={columns}
        dataSource={
          maaltijden
            ? maaltijden.map((maaltijd, index) => ({
                // maaltijd index wordt pas in de database gecreeerd
                key: index,
                product: (
                  <Maaltijd
                    type={maaltijd.type}
                    leverdatum={maaltijd.leverdatum}
                    hoofdschotel={maaltijd.hoofdschotel}
                    //Formik doet moeilijk over boolean values...
                    soep={maaltijd.soep === "soep" ? true : false}
                    dessert={maaltijd.dessert}
                    typeSandwiches={maaltijd.typeSandwiches}
                    hartigBeleg={maaltijd.hartigBeleg}
                    zoetBeleg={maaltijd.zoetBeleg}
                    vetstof={maaltijd.vetstof === "vetstof" ? true : false}
                    suggestieVanDeMaandId={maaltijd.suggestieVanDeMaandId}
                  />
                ),
              }))
            : null
        }
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Geen maaltijden in winkelmandje"
            />
          ),
        }}
        pagination={false}
      />
      <br></br>
      <Row justify="end">
        <Button type="default" danger onClick={deleteWinkelmandje}>
          <DeleteOutlined />
          Verwijder winkelmandje
        </Button>
      </Row>
      <Divider />
      <br></br>

      <Row justify="end">
        <Col>
          <Button
            className="blue"
            type="primary"
            disabled={!maaltijden}
            //medewerker hier nog hard gecodeerd
            onClick={async () => {
              await saveBestelling({
                medewerker: {
                  id: "5",
                  naam: "test",
                  voornaam: "test2",
                  dienst: "Labo",
                },
                maaltijden: maaltijden,
              });
              localStorage.removeItem("maaltijden");
            }}
          >
            Plaats bestelling
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "20px" }} span={24}>
          <Error error={saveError} />
        </Col>
      </Row>
    </div>
  );
}
