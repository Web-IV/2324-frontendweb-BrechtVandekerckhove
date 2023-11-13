import axiosRoot from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export async function getAll(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data.items;
}

export const deleteByBestellingsnr = async (url, { arg: bestellingsnr }) => {
  await axios.delete(`${baseUrl}/${url}/${bestellingsnr}`);
};
export const save = async (url, { arg: body }) => {
  await axios.post(`${baseUrl}/${url}`, body);
};
export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);

  return data;
};
