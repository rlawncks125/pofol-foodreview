import {
  ClearRegisterUserInputDto,
  RegistersubscriptionInputDto,
  RegistersubscriptionOutPutDto,
  RegistersubscriptionUserInputDto,
  RegistersubscriptionUserOutPutDto,
  PatchListerNotificationInputDto,
  PatchListerNotificationOutPutDto,
} from "@/assets/swagger";
import { Worker } from "@/registerServiceWorker";
import axios from "axios";

/** 공개키 받아오기 */
export async function getPublickey() {
  return await axios
    .get("/api/notification/publicKey")
    .then((res) => res.data.key as string);
}

/** 알림 설정 받아오기 */
export async function isPush() {
  const auth = await Worker.insatce.getSubcribeAuth();
  if (!auth) return false;

  return await axios
    .get(`/api/notification/ispush/${auth}`)
    .then((res) => res.data as boolean);
}

/** 알림 설정 여부 변경 */
export async function pathIsPush(): Promise<PatchListerNotificationOutPutDto> {
  const auth = await Worker.insatce.getSubcribeAuth();
  if (!auth)
    return {
      ok: false,
      err: "저장된 값이 없음",
    };

  const data: PatchListerNotificationInputDto = {
    auth,
  };

  return await axios
    .patch(`/api/notification`, data)
    .then((res) => res.data as PatchListerNotificationOutPutDto);
}

/** 알람 등록 */
export async function registerNotification(data: RegistersubscriptionInputDto) {
  return await axios
    .post("/api/notification/register", data)
    .then((res) => res.data as RegistersubscriptionOutPutDto);
}

/** 알람 삭제 */
export async function deleteRegister() {
  // const {
  //   keys: { auth },
  // } = JSON.parse(JSON.stringify(subscription));

  const auth = await Worker.insatce.getSubcribeAuth();

  if (!auth) return;

  // return await fetch(`${ApiServer.url}/notification/${auth}`, {
  //   method: "DELETE",
  // });
  return await axios.delete(`/api/notification/${auth}`);
}

/** 유저 아이디 등록 */
export async function registerUser(data: RegistersubscriptionUserInputDto) {
  return await axios
    .post("/api/notification/register-user", data)
    .then((res) => res.data as RegistersubscriptionUserOutPutDto);
}

/** 유저 아이디 제거 */
export async function delteRegisterUser({ auth }: ClearRegisterUserInputDto) {
  return await axios
    .post("/api/notification/register-user-remove", {
      auth,
    })
    .then((res) => res.data as number);
}

/** 로컬스토리지 구독 삭제 */
export async function deleteRegisterLocalStorege() {
  const subscription = localStorage.getItem("subscription");

  if (!subscription) return;

  const {
    keys: { auth },
  } = JSON.parse(subscription);

  if (!auth) return;

  const ok = await axios.delete(`/api/notification/${auth}`);

  localStorage.removeItem("subscription");
  return ok;
}
