<template>
  <!-- <div class="!flex justify-between pr-4" @click="onClick">
    <div>구독과 알림 설정</div>
    <div :style="status === 'granted' ? { color: 'green' } : { color: 'red' }">
      {{ status }}
    </div>
    <div :style="isPush ? { color: 'green' } : { color: 'red' }">상태</div>
  </div> -->
  <!-- <button @click="onScheduleTest">알람 스케쥴 테스트</button> -->
  <div
    class="!flex h-4 gap-2 items-center justify-between text-gray-900 hover:text-white dark:hover:text-blue-300 dark:text-white"
    @click="onClick"
  >
    <span class="md:ml-3 md:text-white text-sm font-medium">알림 설정</span>
    <label
      class="inline-flex relative mr-2 items-center cursor-pointer pointer-events-none"
    >
      <input
        type="checkbox"
        :checked="isPush"
        class="sr-only peer"
        :disabled="status !== 'granted'"
      />
      <div
        class="w-12 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
      ></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Worker } from "@/registerServiceWorker";
import { useNotification } from "@/store/notification";
import { storeToRefs } from "pinia";

const { isPush, status } = storeToRefs(useNotification());

const onClick = () => {
  status.value === "granted" ? onChnageIsNotification() : requestPermission();
};

/** 알림 권한 요청 */
const requestPermission = () => {
  useNotification().requestPermission();
};

const onChnageIsNotification = async () => {
  await useNotification().changeIsPush();
};

const onScheduleTest = () => {
  // 스케쥴 추가
  // Worker.insatce.createScheduleNotification(
  //   "2초후",
  //   "2초후 알람이 울립니다.",
  //   2000
  // );
  // Worker.insatce.createScheduleNotification(
  //   "3초후",
  //   "3초후 알람이 울립니다.",
  //   3000
  // );
  // Worker.insatce.getScheduleNotification().then(console.log);
  // 지정된 알림 삭제 tag로 식별
  // Worker.insatce.deleteSchedulNotificationByTag("2초후");
  // Worker.insatce.getScheduleNotification().then(console.log);
  // 등록된 알람 삭제
  // Worker.insatce.cleanSchedulNotification();
  // Worker.insatce.getScheduleNotification().then(console.log);
};
</script>

<style scoped></style>
