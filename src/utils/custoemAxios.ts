import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
});

export default customAxios;
