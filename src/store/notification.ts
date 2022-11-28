import { defineStore } from "pinia";
import { ref } from "vue";
import * as Notificaion from "@/api/notification";
import { Worker } from "@/registerServiceWorker";
import { useUser } from "@/store/user";

export const useNotification = defineStore("notification", () => {
  /**
   * 알람의 상태를 확인
   * @desc default = 사용자에게 권한을 요구하지 않음
   * @desc denied = 사용자가 알림 표시 권한을 '거부'
   * @desc granted = 권한을 요구했으며 사용자가 권한을 '허용'
   *  */
  const status = ref<NotificationPermission>(Notification.permission);

  const isPush = ref<boolean>(false);

  const init = async () => {
    setTimeout(async () => {
      isPush.value = await Notificaion.isPush();
      status.value = Notification.permission;
    }, 1000);
  };

  const changeIsPush = async () => {
    const { ok, isPusb } = await Notificaion.pathIsPush();
    if (ok) {
      isPush.value = isPusb!;
    }
  };

  /** 알림 권한 요청 */
  const requestPermission = () => {
    Notification.requestPermission().then(async (permission) => {
      console.log(permission);
      if (["default", "denied", "granted"].includes(permission)) {
        status.value = permission;

        if (permission === "granted") {
          const ok = await Worker.insatce.subscribe();
          if (ok) {
            isPush.value = true;
          }

          const id = useUser().userInfo?.id;

          if (id) {
            Worker.insatce.registerByUser(id);
          }
        }
      }
    });
  };

  return {
    isPush,
    status,
    init,
    changeIsPush,
    requestPermission,
  };
});
