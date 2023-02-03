import { deleteUser, logIn } from "@/api/auth";
import { LoginOutPutDto, User, UserInfo } from "@/assets/swagger";
import { defineStore } from "pinia";
import { ref } from "vue";
import { token as authToken } from "@/api/auth";
import { token as socketToken } from "@/api/Socket";
import { Worker } from "@/registerServiceWorker";
import { useRouter } from "vue-router";

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

        await Worker.insatce.registerByUser(res.user.id);
      }
      return res;
    };

    const userLogOut = async () => {
      token.value = null;
      userInfo.value = null;
      authToken.value = null;
      socketToken.value = null;

      await Worker.insatce.removeRegisterByUser();

      console.log("로그아웃");
    };

    const userDelete = async () => {
      // 유저 삭제
      const sucees = await deleteUser();
      console.log(sucees);
      await userLogOut();
    };

    const updateInfo = (user: User) => {
      userInfo.value = user;
    };

    return { token, userInfo, userLogin, userLogOut, updateInfo, userDelete };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token", "userInfo"],
    },
  }
);
