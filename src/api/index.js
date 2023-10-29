import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export async function getAll(url) {
  const { data } = await axios.get(` ${baseUrl}/${url}`);
  return data.items;
}

export const deleteByBestellingsnr = async (url, { arg: bestellingsnr }) => {
  await axios.delete(` ${baseUrl}/${url}/${bestellingsnr}`);
};
export const save = async (url, { arg: body }) => {
  await axios.post(`${baseUrl}/${url}`, body);
};
