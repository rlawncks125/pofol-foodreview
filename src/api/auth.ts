import {
  LoginOutPutDto,
  userCreateOutPutDto,
  UserOutPut,
} from "@/assets/swagger";
import { useToken } from "@/store/index";
import axios, { AxiosRequestConfig } from "axios";
import { storeToRefs } from "pinia";

import { computed, watch } from "vue";

// main.ts에 import 안할시
// 처음 호출되는곳에서 init
// console.log("auth 로드");

const { setToken } = useToken();
const { token: sToken } = storeToRefs(useToken());
const token = sToken;

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
  const base64 = Buffer.from(username).toString("base64");
  console.log(base64);
  return axios
    .get(`/api/user`, {
      auth: {
        username: base64,
        password,
      },
    })
    .then((res: any) => {
      const result: LoginOutPutDto = res.data;

      const { ok, token, err, user } = result;
      console.log(result);

      // 토큰 vuex에 저장 처리
      if (ok) {
        token && setToken(token);
      } else {
        console.log(err);
      }

      return result;
    })
    .catch((e) => e);
};

export const testUser = async (): Promise<boolean> => {
  return axios
    .get(`/api/user/test`, AuthHeaders)
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
  const base64 = Buffer.from(username).toString("base64");

  return axios
    .post(
      `/api/user`,
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

export const editUser = async (dsc: string): Promise<any> => {
  return await axios
    .patch(`/api/user`, { dsc }, AuthHeaders)
    .then((res: any) => {
      return res.data;
    });
};

export const logOut = () => {
  setToken("");
};

// const triger = EnumEventTriggerTypes.LEAVEROOM;
