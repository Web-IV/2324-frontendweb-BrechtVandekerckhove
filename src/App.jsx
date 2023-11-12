import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <Menu
          mode="horizontal"
          className="menu"
          items={[
            {
              key: "1",
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              label: <Link to="/bestellingen">Bestellingen</Link>,
            },
            {
              key: "3",
              label: <Link to="/profiel">Mijn profiel</Link>,
              icon: <UserOutlined />,
              style: { marginLeft: "auto" },
            },
            {
              key: "4",
              label: <Link to="/winkelmandje" data-cy="button_winkelmandje">Winkelmandje</Link>,
              icon: <ShoppingCartOutlined />,
              
            },
          ]}
        />
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
export default App;
