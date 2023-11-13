import { Spin } from "antd";

export default function Loader({ message }) {
  return (
    <div data-cy="loader" className="loader">
      <Spin />
      <p>{message}</p>
    </div>
  );
}
