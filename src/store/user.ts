import { logIn } from "@/api/auth";
import { User, UserInfo } from "@/assets/swagger";
import { defineStore } from "pinia";
import { ref } from "vue";
import { token as authToken } from "@/api/auth";

export const useUser = defineStore(
  "token",
  () => {
    const token = ref<string | null>(null);

    const userLogin = async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      console.log("로그인", username, password);

      const res = await logIn({
        username,
        password,
      });

      if (res.ok) {
        console.log(res);
        token.value = res.token || null;
        authToken.value = res.token || null;
      }
    };

    const userLogOut = () => {
      console.log("로그아웃");
      token.value = null;
      authToken.value = null;
    };

    return { token, userLogin, userLogOut };
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
