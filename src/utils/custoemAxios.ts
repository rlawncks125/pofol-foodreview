import { useAuthHeaders } from "@/composables/useAuthHeaders";
import axios, { AxiosRequestConfig } from "axios";

const { AuthHeaders } = useAuthHeaders();

// # Axios 관련
const customAxios = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
});

customAxios.interceptors.request.use((config) => {
  config.headers = AuthHeaders.headers;

  return config;
});

customAxios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default customAxios;
