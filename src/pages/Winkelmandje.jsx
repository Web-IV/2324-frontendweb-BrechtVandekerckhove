import { Typography } from "antd";

import { Outlet } from "react-router-dom";

//basis code: https://github.com/bilaltahseen/Shoping-Cart-UI-Antdesign/blob/master/src/Pages/Cart.js

const { Title } = Typography;

export default function Winkelmandje() {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Title level={1}>Winkelmandje</Title>
      <Outlet />
    </div>
  );
}
