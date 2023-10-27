import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={`Sorry, er is geen pagina met url ${pathname}.`}
      extra={
        <Button className="blue">
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
        </Button>
      }
    />
  );
}
