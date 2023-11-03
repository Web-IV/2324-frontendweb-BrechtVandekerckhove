import { Table, Empty } from "antd";
import Maaltijd from "./Maaltijd";

const columns = [
  {
    title: "Maaltijd",
    dataIndex: "maaltijd",
    key: "maaltijd",
  },
  {
    title: "Medewerker",
    dataIndex: "medewerker",
    key: "medewerker",
    width: "300px",
  },
];

export default function MaaltijdenLijst({ maaltijden }) {
  return (
    <Table
      style={{ marginTop: "20px", maxWidth: "800px" }}
      columns={columns}
      dataSource={maaltijden.map((maaltijd, index) => ({
        // maaltijd index wordt pas in de database gecreeerd
        key: index,
        maaltijd: <Maaltijd {...maaltijd} />,
      }))}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Geen maaltijden"
          />
        ),
      }}
      pagination={false}
    />
  );
}
