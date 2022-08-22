<template>
  <div class="text-red-400">test</div>
  <div ref="mapRef" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup lang="ts">
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onMounted, ref } from "vue";

const mapRef = ref();

onMounted(() => {
  new CustomNaverMaps(mapRef, new naver.maps.LatLng(126.6838396, 37.4592758));
});
</script>

<style scoped></style>
