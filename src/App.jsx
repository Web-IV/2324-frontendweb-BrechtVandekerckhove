import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
              label: (
                <Link to="/winkelmandje">
                  Winkelmandje
                </Link>
              ),
              icon: <ShoppingCartOutlined />,
              style: { marginLeft: "auto" },
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
