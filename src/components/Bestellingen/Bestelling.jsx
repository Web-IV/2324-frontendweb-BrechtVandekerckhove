import Maaltijd from "../Maaltijden/Maaltijd";
import { useCallback } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export default function Bestelling({
  bestellingsnr,
  besteldatum,
  maaltijden,
  onDelete,
}) {
  const handleDelete = useCallback(() => {
    onDelete(bestellingsnr);
  }, [bestellingsnr, onDelete]);

  return (
    <table>
      <thead>
        <tr>
          <th>Bestelling {bestellingsnr}</th>
        </tr>
        <tr>
          <td>Besteldatum: {besteldatum}</td>
          <td>
            <Button danger onClick={handleDelete}>
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
