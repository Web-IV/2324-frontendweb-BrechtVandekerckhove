import Maaltijd from "../Maaltijden/Maaltijd";
import { useCallback } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export default function Bestelling({
  bestellingsnr,
  besteldatum,
  maaltijden,
  onDelete,
}) {
  const handleDelete = useCallback(() => {
    onDelete(bestellingsnr);
  }, [bestellingsnr, onDelete]);

  const showDeleteConfirm = useCallback(() => {
    confirm({
      title: "Ben je zeker dat je deze bestelling wilt verwijderen?",
      icon: <ExclamationCircleOutlined/>,
      okText: "Ja",
      okType: "danger",
      cancelText: "Nee",
      onOk() {
        handleDelete();
      },
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Bestelling {bestellingsnr}</th>
        </tr>
        <tr>
          <td>Besteldatum: {besteldatum}</td>
          <td>
            <Button danger onClick={showDeleteConfirm}>
              <DeleteOutlined />
              verwijder bestelling
            </Button>
          </td>
        </tr>
      </thead>
      <tbody>
        {maaltijden.map((maaltijd) => (
          <tr>
            <td>
              <Maaltijd {...maaltijd} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
