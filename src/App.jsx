import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <NavBar />
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
export default App;
