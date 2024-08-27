import { AxiosRequestConfig } from "axios";
import { ref, watch } from "vue";

export const useAuthHeaders = () => {
  const parseToken =
    JSON.parse(localStorage.getItem("token") as string)?.token || null;

  const token = ref<string | null>(parseToken);

  const AuthHeaders: AxiosRequestConfig = {
    headers: {
      "acces-token": token.value,
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const readToken = () => token.value;

  const setToken = (newToken: string | null) => {
    newToken && (token.value = newToken);
  };

  watch(token, () => {
    console.log("wacth", AuthHeaders);
    AuthHeaders.headers!["acces-token"] = token.value;
  });

  return {
    readToken,
    setToken,
    AuthHeaders,
  };
};
