import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";
import { Result } from "antd";
import Loader from "../components/Loader";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);
  if (isAuthed) {
    return <Loader message="Uitloggen" />;
  }

  return (
    <Result
      status="success"
      title="
      Je bent succesvol uitgelogd"
    ></Result>
  );
}
