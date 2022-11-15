import { logIn } from "@/api/auth";
import { LoginOutPutDto, User, UserInfo } from "@/assets/swagger";
import { defineStore } from "pinia";
import { ref } from "vue";
import { token as authToken } from "@/api/auth";
import { token as socketToken } from "@/api/Socket";

export const useUser = defineStore(
  "token",
  () => {
    const token = ref<string | null>(null);
    const userInfo = ref<User | null>();

    const userLogin = async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<LoginOutPutDto> => {
      console.log("로그인", username, password);

      const res = await logIn({
        username,
        password,
      });

      if (res.ok) {
        console.log(res);
        token.value = res.token!;
        authToken.value = res.token!;
        socketToken.value = res.token!;
        userInfo.value = res.user;
      }
      return res;
    };

    const userLogOut = () => {
      token.value = null;
      userInfo.value = null;
      authToken.value = null;
      socketToken.value = null;
      console.log("로그아웃");
    };

    const updateInfo = (user: User) => {
      userInfo.value = user;
    };

    return { token, userInfo, userLogin, userLogOut, updateInfo };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token", "userInfo"],
    },
  }
);
