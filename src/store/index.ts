import { defineStore } from "pinia";
import { ref } from "vue";

export const userCount = defineStore(
  "conunt",
  () => {
    const count = ref(0);

    const countPlugs = () => {
      count.value = count.value + 1;
    };

    return { count, countPlugs };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ["count"],
        },
      ],
    },
  }
);

export const useToken = defineStore(
  "token",
  () => {
    const token = ref("");

    const setToken = (_token: string) => {
      token.value = _token;
    };

    const clearToken = () => {
      token.value = "";
    };

    return { token, setToken, clearToken };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ["token"],
        },
      ],
    },
  }
);
