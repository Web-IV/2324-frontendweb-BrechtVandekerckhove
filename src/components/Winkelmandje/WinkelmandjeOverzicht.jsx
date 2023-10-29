import {
  Row,
  Col,
  Button,
  Typography,
  Table,
  Divider,
  Empty,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Maaltijd from "../Maaltijden/Maaltijd";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";
import { useState } from "react";
import { Link } from "react-router-dom";

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
              verwijder
            </Button>
          </div>
          <div>
            <Link to={`/winkelmandje/bewerk/${index}`}>
              <Button type="default" style={{ marginTop: "10px" }}>
                <EditOutlined />
                Bewerk
              </Button>
            </Link>
          </div>
        </div>
      ),
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const showConfirmation = () => {
    messageApi.open({
      type: "success",
      content: "Bestelling succesvol geplaatst",
      duration: 3,
    });
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
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
                product: <Maaltijd {...maaltijd} />,
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
            //medewerkerId hier nog hard gecodeerd
            onClick={async () => {
              await saveBestelling({
                medewerkerId: 1,
                maaltijden: maaltijden,
              });
              localStorage.removeItem("maaltijden");
              setMaaltijden(null);
              showConfirmation();
            }}
          >
            Plaats bestelling
          </Button>
          {contextHolder}
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
