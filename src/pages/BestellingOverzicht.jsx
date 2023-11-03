import Bestelling from "../components/Bestellingen/Bestelling";
import AsyncData from "../components/AsyncData";
import useSWR from "swr";
import { getAll, deleteByBestellingsnr } from "../api";
import useSWRMutation from "swr/mutation";
import { Typography, DatePicker, Button, Space, Table, Empty } from "antd";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import MaaltijdenLijst from "../components/Maaltijden/MaaltijdenLijst";

const { Title } = Typography;

function BestellingTabel({ bestellingen, onDelete }) {
  return bestellingen.map((bestelling) => (
    <Bestelling
      key={bestelling.bestellingsnr}
      onDelete={onDelete}
      {...bestelling}
    />
  ));
}

export default function BestellingOverzicht() {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll);

  const [leverdatum, setLeverdatum] = useState();
  const [zoekLeverdatum, setZoekLeverdatum] = useState();

  const { trigger: deleteBestelling, error: deleteError } = useSWRMutation(
    "bestellingen",
    deleteByBestellingsnr
  );

  const gefilterdeMaaltijden = useMemo(
    () =>
      bestellingen
        .flatMap((bestelling) => bestelling.maaltijden)
        .filter(
          (maaltijd) =>
            dayjs(maaltijd.leverdatum).format("DD-MM-YYYY") === zoekLeverdatum
        ),
    [bestellingen, zoekLeverdatum]
  );

  return (
    <>
      <Title>Bestellingen</Title>
      <AsyncData loading={isLoading} error={error || deleteError}>
        {!error ? (
          <>
            {bestellingen.length === 0 ? (
              <Table
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Geen bestellingen"
                    />
                  ),
                }}
              />
            ) : (
              <BestellingTabel
                bestellingen={bestellingen}
                onDelete={deleteBestelling}
              />
            )}
            <Title level={2}>Zoek maaltijd op leverdatum</Title>
            <Space size="middle">
              <DatePicker
                placeholder="Leverdatum"
                format="DD-MM-YYYY"
                onChange={(date, dateString) => setLeverdatum(dateString)}
              />
              <Button
                type="primary"
                className="blue"
                onClick={() => {
                  setZoekLeverdatum(leverdatum);
                }}
              >
                Zoek
              </Button>
            </Space>
            <MaaltijdenLijst maaltijden={gefilterdeMaaltijden} />
          </>
        ) : null}
      </AsyncData>
    </>
  );
}
