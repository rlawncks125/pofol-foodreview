<template>
  <loading :is-show="isLoading" />
  <header>
    <component :is="$route.meta.nav || 'div'" />
  </header>
  <main class="min-h-[80vh]">
    <router-view :key="route.fullPath" />
  </main>
  <footer
    v-show="isShowFooter"
    class="mt-[2rem] bg-slate-700 text-white p-2 font-bold text-[1.2rem]"
  >
    <div>푸터2</div>
    <div>email : rlawncks125@naver.com</div>
    <div>tel : 010-7115-9176</div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useLoading } from "@/store/loading";
import { storeToRefs } from "pinia";

import * as Socket from "@/api/Socket";

import "@/api/auth";
import Loading from "./components/loading.vue";
import { onMounted, ref, watch } from "vue";
import { mobileHeightSize } from "./common/mobileSize";

import { useNotification } from "@/store/notification";

const route = useRoute();
const isShowFooter = ref<boolean>(true);

const { isLoading } = storeToRefs(useLoading());

onMounted(async () => {
  window.addEventListener("load", mobileHeightSize);
  window.addEventListener("resize", mobileHeightSize);

  if (!Socket.isConneted()) {
    Socket.init();
  }
  useNotification().init();
});

watch(
  () => route.fullPath,
  () => {
    const list = ["/chat/room"];

    isShowFooter.value = true;
    list.forEach((path) => {
      if (route.fullPath.includes(path)) {
        isShowFooter.value = false;
      }
    });
  }
);
</script>

<style>
body {
  /* @apply bg-blue-400; */
  @apply bg-white dark:bg-gray-700 text-[.8rem] relative dark:text-white;
}
</style>
