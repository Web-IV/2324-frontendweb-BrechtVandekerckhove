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
import Maaltijd from "../components/Maaltijden/Maaltijd";
import useSWRMutation from "swr/mutation";
import { save } from "../api";
import Error from "../components/Error";
import { useState } from "react";
import { Outlet } from "react-router-dom";

//basis code: https://github.com/bilaltahseen/Shoping-Cart-UI-Antdesign/blob/master/src/Pages/Cart.js

const { Title } = Typography;

export default function WinkelmandjePagina() {

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Title level={1}>Winkelmandje</Title>
      <Outlet />
    </div>
  );
}
