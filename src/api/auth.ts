import {
  LoginOutPutDto,
  User,
  userCreateOutPutDto,
  UserUpdateInputDto,
} from "@/assets/swagger";
import { useUser } from "@/store/user";

// import axios, { AxiosRequestConfig } from "axios";
import axios from "@/utils/custoemAxios";
import { AxiosRequestConfig } from "axios";
import { storeToRefs } from "pinia";

import { ref, watch } from "vue";

// main.ts에 import 안할시
// 처음 호출되는곳에서 init
// console.log("auth 로드");

// pinia 를 createApp 전에 호출할수 없어
// localStoreage로 값을 가져옴
// 내보낸 token ref값으로 외부 에서 값을 갱신

const parseToken =
  JSON.parse(localStorage.getItem("token") as string)?.token || null;

export const token = ref<string | null>(parseToken);

export const AuthHeaders: AxiosRequestConfig = {
  headers: {
    "acces-token": token.value,
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
};

watch(token, () => {
  console.log("wacth", AuthHeaders);
  AuthHeaders.headers!["acces-token"] = token.value;
});

interface IBasicAuth {
  username: string;
  password: string;
}

export const logIn = async ({
  username,
  password,
}: IBasicAuth): Promise<LoginOutPutDto> => {
  // 한글 값 보낼시
  // error : Failed to execute 'btoa' on 'Window'
  // 해결 base 64로 인코딩하여 보내고
  // 백엔드에서 디코딩 하여 값얻기

  // const base64 = Buffer.from(username).toString("base64");
  const base64 = window.btoa(unescape(encodeURIComponent(username)));
  console.log(base64);
  return axios
    .get(`/user`, {
      auth: {
        username: base64,
        password,
      },
    })
    .then((res: any) => {
      const result: LoginOutPutDto = res.data;

      return result;
    })
    .catch((e) => e);
};

export const testUser = async (): Promise<boolean> => {
  return axios
    .get(`/user/test`, AuthHeaders)
    .then((res) => true)
    .catch((e) => false);
};

export const createUser = async ({
  username,
  password,
}: IBasicAuth): Promise<userCreateOutPutDto> => {
  // 한글 값 보낼시
  // error : Failed to execute 'btoa' on 'Window'
  // 해결 base 64로 인코딩하여 보내고
  // 백엔드에서 디코딩 하여 값얻기
  // const base64 = Buffer.from(username).toString("base64");
  const base64 = window.btoa(unescape(encodeURIComponent(username)));

  return axios
    .post(
      `/user`,
      {},
      {
        auth: {
          username: base64,
          password,
        },
      }
    )
    .then((res: any) => {
      return res.data;
    });
};

export const editUser = async (input: UserUpdateInputDto): Promise<any> => {
  return await axios
    .patch(`/user`, { ...input }, AuthHeaders)
    .then((res: any) => {
      return res.data as Promise<{ ok: boolean; user: User }>;
    });
};

export const deleteUser = async () => {
  return await axios
    .delete("/user", AuthHeaders)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

// const triger = EnumEventTriggerTypes.LEAVEROOM;
