/* eslint-disable no-console */

import axios from "axios";
import { register } from "register-service-worker";

// if (process.env.NODE_ENV === "production") {
register(`${process.env.BASE_URL}sw.js`, {
  ready() {
    console.log("준비됨");
  },
  registered(regist) {
    Worker.insatce.setRegist(regist);
    // console.log("Service worker has been registered.");
    console.log("Service worker 준비 완료");
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    // console.log("New content is downloading.");

    const newWorker = Worker.insatce.installing();
    console.log("Service worker 업데이트 발견");

    newWorker?.addEventListener("statechange", function () {
      console.log("Service worker 상태 변경", this.state);
    });
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
// }

export class Worker {
  // @ts-ignore
  #regist: ServiceWorkerRegistration;

  static insatce = new Worker();

  constructor() {}

  get register() {
    return this.#regist;
  }

  setRegist(regist: ServiceWorkerRegistration) {
    this.#regist = regist;
  }

  installing() {
    return this.#regist.installing;
  }

  /** 구독 상태 여부 */
  async isSubscribe() {
    return (await this.#regist.pushManager.getSubscription()) !== null;
  }

  /** 구독 하기 */
  async subscribe() {
    return await this.#regist.pushManager
      .subscribe({
        userVisibleOnly: true,
        // 백엔드에서 키받아오기
        applicationServerKey: await getPublickey(),
      })
      .then(async (subscriptuon) => {
        console.log(JSON.stringify(subscriptuon));
        // 백엔드 구독 등록

        const id = await registerNotification(subscriptuon);

        console.log(id);

        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to subscribe the user: ", err);
      });
  }

  /** 구독 취소 */
  async unSubcribe() {
    if ((await this.isSubscribe()) === null) return;
    return await this.#regist.pushManager
      .getSubscription()
      .then(async (subscription) => {
        // 백엔드 구독 삭제
        await deleteRegister();

        await subscription?.unsubscribe();

        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to unSubscribe the user: ", err);
      });
  }

  async getSubcribeAuth() {
    return this.#regist.pushManager.getSubscription().then((subscription) => {
      if (!subscription) return null;
      const {
        keys: { auth },
      } = JSON.parse(JSON.stringify(subscription));

      return auth;
    });
  }

  /** 유저 아이디 등록 */
  async registerByUser(userId: number) {
    const auth = await Worker.insatce.getSubcribeAuth();

    if (!auth) return;

    return await axios
      .post("https://myapi.kimjuchan97.xyz/notification/register-user", {
        auth,
        userId,
      })
      .then((res) => res.data as number);
  }

  /** 유저 아이디 제거 */
  async removeRegisterByUser() {
    const auth = await Worker.insatce.getSubcribeAuth();

    if (!auth) return;

    return await axios
      .post("https://myapi.kimjuchan97.xyz/notification/register-user-remove", {
        auth,
      })
      .then((res) => res.data as number);
  }
}

/** 공개키 받아오기 */
async function getPublickey() {
  return await axios
    .get("https://myapi.kimjuchan97.xyz/notification/publicKey")
    .then((res) => res.data.key as string);
}

/** 알람 등록 */
async function registerNotification(subscription: any) {
  return await axios
    .post("https://myapi.kimjuchan97.xyz/notification/register", {
      subscription,
    })
    .then((res) => res.data.id as number);
}

/** 알람 삭제 */
async function deleteRegister() {
  // const {
  //   keys: { auth },
  // } = JSON.parse(JSON.stringify(subscription));

  const auth = await Worker.insatce.getSubcribeAuth();

  if (!auth) return;

  // return await fetch(`${ApiServer.url}/notification/${auth}`, {
  //   method: "DELETE",
  // });
  return await axios.delete(
    `https://myapi.kimjuchan97.xyz/notification/${auth}`
  );
}
