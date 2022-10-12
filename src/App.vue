<template>
  <loading :is-show="isLoading" />
  <div>
    <navigation v-if="layout.nav === 'home'" />
    <chat-navigation v-else-if="layout.nav === 'chat'" />
  </div>
  <div>main</div>
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

const route = useRoute();
const { layout } = storeToRefs(useLayout());
const { isLoading } = storeToRefs(useLoading());
</script>

<style>
body {
  /* @apply bg-blue-400; */
}
</style>
