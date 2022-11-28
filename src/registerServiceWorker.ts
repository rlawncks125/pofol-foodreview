/* eslint-disable no-console */

import { register } from "register-service-worker";
import { ref } from "vue";

import * as Notification from "@/api/notification";

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

  #isSubscribe = ref<boolean>();
  constructor() {}

  get register() {
    return this.#regist;
  }

  get getterIsSubscribe() {
    return this.#isSubscribe.value;
  }

  async setRegist(regist: ServiceWorkerRegistration) {
    this.#regist = regist;
    await this.isSubscribe();

    // 알람 권한 변경으로 기존 구독이 삭제안됐을시 삭제
    if (!this.getterIsSubscribe) {
      Notification.deleteRegisterLocalStorege();
    }
  }

  installing() {
    return this.#regist.installing;
  }

  /** 구독 상태 여부 */
  async isSubscribe() {
    const status = (await this.#regist.pushManager.getSubscription()) !== null;
    this.#isSubscribe.value = status;
    return status;
  }

  /** 구독 하기 */
  async subscribe() {
    return await this.#regist.pushManager
      .subscribe({
        userVisibleOnly: true,
        // 백엔드에서 키받아오기
        applicationServerKey: await Notification.getPublickey(),
      })
      .then(async (subscription) => {
        // console.log(JSON.stringify(subscription));
        // 백엔드 구독 등록

        const ok = await Notification.registerNotification({ subscription });
        // 알림 차단을 했을시 이전 구독 정보를 저장하기위한 용도
        localStorage.setItem("subscription", JSON.stringify(subscription));

        console.log(ok);

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
        await Notification.deleteRegister();

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

    return Notification.registerUser({
      auth,
      userId,
    });
  }

  /** 유저 아이디 제거 */
  async removeRegisterByUser() {
    const auth = await Worker.insatce.getSubcribeAuth();

    if (!auth) return;

    return Notification.delteRegisterUser({ auth });
  }
}
