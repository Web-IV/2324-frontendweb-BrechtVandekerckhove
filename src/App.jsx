import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header className="blue header">
        <Menu
          mode="horizontal"
          style={{ margin: "10px 0" }}
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
              label: "Winkelmandje",
              icon: <ShoppingCartOutlined />,
              style: { marginLeft: "auto" },
            },
          ]}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
export default App;
