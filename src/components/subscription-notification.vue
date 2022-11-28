<template>
  <div class="!flex justify-between pr-4" @click="onClick">
    <div>구독과 알림 설정</div>
    <div :style="status === 'granted' ? { color: 'green' } : { color: 'red' }">
      {{ status }}
    </div>
    <div :style="isPush ? { color: 'green' } : { color: 'red' }">상태</div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped></style>
