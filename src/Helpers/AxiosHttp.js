import axios from "axios";

const URL_BASE = 'http://localhost:5000/api/';

export const AxiosGet = async url => await axios.get(URL_BASE + url, { withCredentials: true });

export const AxiosPost = async (url, data) => await axios.post(URL_BASE + url, data, { withCredentials: true });

export const AxiosPut = async (url, data) => await axios.put(URL_BASE + url, data, { withCredentials: true });

export const AxiosDelete = async url => await axios.delete(URL_BASE + url, { withCredentials: true });