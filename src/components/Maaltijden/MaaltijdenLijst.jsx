import { Table, Empty } from "antd";
import Maaltijd from "./Maaltijd";

const columns = [
  {
    title: "Maaltijd",
    dataIndex: "maaltijd",
    key: "maaltijd",
    className: "maaltijd",
  },
  {
    title: "Medewerker",
    dataIndex: "medewerker",
    key: "medewerker",
    width: "300px",
    className: "medewerker",
  },
];

export default function MaaltijdenLijst({ maaltijden }) {
  return (
    <Table
      style={{ marginTop: "20px", maxWidth: "800px" }}
      columns={columns}
      data-cy="tabel_maaltijden"
      dataSource={maaltijden.map((maaltijd, index) => ({
        // maaltijd index wordt pas in de database gecreeerd
        key: index,
        maaltijd: <Maaltijd {...maaltijd} />,
        medewerker:`${maaltijd.medewerker.voornaam} ${maaltijd.medewerker.naam}`
        
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
