import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/Auth.context";

export default function NavBar() {
  const { isAuthed } = useAuth();

  return (
    <Menu
      mode="horizontal"
      className="menu"
      items={[
        {
          key: "home",
          label: <Link to="/">Home</Link>,
        },
        {
          key: "bestellingen",
          label: <Link to="/bestellingen">Bestellingen</Link>,
        },
        {
          key: "profiel",
          label: isAuthed ? (
            <Link to="/profiel" style={{ color: "black" }}>
              Welkom
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          ),
          icon: <UserOutlined style={{ color: "black" }} />,
          style: { marginLeft: "auto" },
          children: isAuthed
            ? [
                {
                  key: "profiel",
                  label: <Link to="/profiel">Mijn profiel</Link>,
                },
                {
                  key: "uitloggen",
                  label: <Link to="/logout">Uitloggen</Link>,
                },
              ]
            : null,
        },
        {
          key: "winkelmandje",
          label: (
            <Link to="/winkelmandje" data-cy="button_winkelmandje">
              Winkelmandje
            </Link>
          ),
          icon: <ShoppingCartOutlined />,
        },
      ]}
    />
  );
}
