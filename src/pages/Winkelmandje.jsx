import { Row, Col, Button, Typography, Table, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MAALTIJDEN from "../api/mock_data_maaltijden";
import Maaltijd from "../components/Maaltijden/Maaltijd";

//basis code: https://github.com/bilaltahseen/Shoping-Cart-UI-Antdesign/blob/master/src/Pages/Cart.js

const { Title } = Typography;

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
    render: () => (
      <div>
        <div>
          <Button danger>
            <DeleteOutlined />
            verwijder
          </Button>
        </div>
        <div>
          <Button type="default" style={{marginTop:'10px'}}><EditOutlined/>Bewerk</Button>
        </div>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    product: "Warme maaltijd",
  },
];

export default function Winkelmandje() {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Title level={1}>Winkelmandje</Title>
      <Title level={2}>Total Items: {MAALTIJDEN.length}</Title>

      <br></br>
      <Table
        columns={columns}
        dataSource={MAALTIJDEN.map((maaltijd, index) => ({
          key: index,
          product: <Maaltijd {...maaltijd} />,
        }))}
        pagination={false}
      />
      <br></br>
      <Row justify="end">
        <Button type="default" danger>
          <DeleteOutlined />
          Verwijder winkelmandje
        </Button>
      </Row>
      <Divider />
      <br></br>
      <Row justify="end">
        <Col>
          <Button className="blue" type="primary">
            Plaats bestelling
          </Button>
        </Col>
      </Row>
    </div>
  );
}
