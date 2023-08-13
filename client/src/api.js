import axios from "axios";

const urlAuth = "/auth";
const url = "/auth/user";

export const registrationUser = async (dataUser) => {
  const res = await axios.post(`${url}/registration`, dataUser);
  return res.data;
};

export const loginUser = async (dataUser) => {
  const res = await axios.post(`${url}/login`, dataUser);
  return res.data;
};

export const auth = async (token) => {
  const res = await axios.post(`${urlAuth}`, { token });
  return res.data;
};

export const getList = async (id) => {
  const res = await axios.get(`${url}/${id}`);
  return res.data;
};

export const addList = async (id, data) => {
  const res = await axios.patch(`${url}/addlist/${id}`, data);
  return res.data;
};

export const finishList = async (id, index) => {
  const res = await axios.patch(`${url}/finishlist/${id}`, { index });
  return res.data;
};

export const deleteList = async (id, index) => {
  const res = await axios.patch(`${url}/deletelist/${id}`, { index });
  return res.data;
};
