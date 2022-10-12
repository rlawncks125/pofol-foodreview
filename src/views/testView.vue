<template>
  <div class="text-red-400" ref="endELRef">test</div>

  <div ref="mapRef" class="w-full h-[100vh]"></div>
</template>

<script setup lang="ts">
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onMounted, onUnmounted, ref } from "vue";

import { useLayout } from "@/store/layout";

useLayout().setNav("chat");

const endELRef = ref<HTMLElement>();

const mapRef = ref();
let naverMaps: CustomNaverMaps;
let mapFullFunc: any;

onMounted(() => {
  naverMaps = new CustomNaverMaps(
    mapRef,
    new naver.maps.LatLng(126.6838396, 37.4592758)
  );
  mapFullFunc = () => naverMaps.HeigthFullByEndEl(endELRef.value!);

  mapFullFunc();
  window.addEventListener("resize", mapFullFunc);
});
onUnmounted(() => {
  window.removeEventListener("resize", mapFullFunc);
});
</script>

<style scoped></style>
