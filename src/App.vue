<template>
  <loading :is-show="isLoading" />
  <div>
    <navigation v-if="layout.nav === 'home'" />
    <chat-navigation v-else-if="layout.nav === 'chat'" />
  </div>

  <router-view :key="route.fullPath" />
</template>

<script setup lang="ts">
import Navigation from "./components/navigation.vue";
import { useRoute } from "vue-router";

import { useLayout } from "@/store/layout";
import { useLoading } from "@/store/loading";
import { storeToRefs } from "pinia";
import ChatNavigation from "./components/ChatNavigation.vue";

import "@/api/auth";
import Loading from "./components/loading.vue";
import { onMounted } from "vue";
import { mobileHeightSize } from "./common/mobileSize";

const route = useRoute();
const { layout } = storeToRefs(useLayout());
const { isLoading } = storeToRefs(useLoading());

onMounted(() => {
  window.addEventListener("load", mobileHeightSize);
  window.addEventListener("resize", mobileHeightSize);
});
</script>

<style>
body {
  /* @apply bg-blue-400; */
  @apply text-[.8rem];
}
</style>
