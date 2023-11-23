import Maaltijd from "../Maaltijden/Maaltijd";
import { useCallback,memo } from "react";
import { Button, Modal, Table, Space } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const dateConverter = (date) => {
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  return date.toLocaleDateString();
};

export default memo(function Bestelling({
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
      icon: <ExclamationCircleOutlined />,
      okText: "Ja",
      okType: "danger",
      cancelText: "Nee",
      centered: true,
      onOk() {
        handleDelete();
      },
    });
  }, []);

  const columns = [
    {
      title: `Bestelling ${bestellingsnr}`,
      dataIndex: "bestelling",
      key: "bestelling",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Besteldatum",
      dataIndex: "besteldatum",
      key: "besteldatum",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Button data-cy="btn_deleteBestelling" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
          verwijder bestelling
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      bestelling: `Bestelling ${bestellingsnr}`,
      besteldatum: `Besteldatum: ` + dateConverter(besteldatum),
      actions: "",
    },
  ];

  return (
    <div style={{ maxWidth: "800px" }}>
      <Table
      data-cy="bestelling"
        columns={columns}
        showHeader={false}
        pagination={false}
        dataSource={data}
        expandable={{
          expandedRowRender: () => (
            <Space direction="vertical" size="middle">
              {maaltijden.map((maaltijd, index) => (
                <Maaltijd key={index} {...maaltijd} />
              ))}
            </Space>
          ),
        }}
      />
      
    </div>
  );
});
