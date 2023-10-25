import { Table, Empty} from "antd";
import Maaltijd from "./Maaltijd";

const columns = [
  {
    title: "Maaltijd",
    dataIndex: "maaltijd",
    key: "maaltijd",
  },
  {
    title: "Dienst",
    dataIndex: "dienst",
    key: "dienst",
  },
];

export default function MaaltijdenLijst({ maaltijden }) {
  return(
    
  <Table
    style={{ marginTop: "20px", maxWidth: "800px"  }}
    columns={columns}
    dataSource={maaltijden.map((maaltijd, index) => ({
      // maaltijd index wordt pas in de database gecreeerd

      key: index,
      maaltijd: (
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
    
  />)
}
