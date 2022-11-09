<template>
  <loading :is-show="isLoading" />
  <div>
    <navigation v-if="layout.nav === 'home'" />
    <chat-navigation v-else-if="layout.nav === 'chat'" />
  </div>
  <div class="min-h-[80vh]">
    <router-view :key="route.fullPath" />
  </div>
  <footer
    v-show="isShowFooter"
    class="mt-[2rem] bg-slate-700 text-white p-2 font-bold text-[1.2rem]"
  >
    <div>푸터</div>
    <div>email : rlawncks125@naver.com</div>
    <div>tel : 010-7115-9176</div>
  </footer>
</template>

<script setup lang="ts">
import Navigation from "@/components/Layout_Nav/navigation.vue";
import { useRoute } from "vue-router";

import { useLayout } from "@/store/layout";
import { useLoading } from "@/store/loading";
import { storeToRefs } from "pinia";
import ChatNavigation from "@/components/Layout_Nav/ChatNavigation.vue";

import "@/api/auth";
import Loading from "./components/loading.vue";
import { onMounted, ref, watch } from "vue";
import { mobileHeightSize } from "./common/mobileSize";

const route = useRoute();
const isShowFooter = ref<boolean>(true);

const { layout } = storeToRefs(useLayout());
const { isLoading } = storeToRefs(useLoading());

onMounted(() => {
  window.addEventListener("load", mobileHeightSize);
  window.addEventListener("resize", mobileHeightSize);
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
  @apply text-[.8rem] relative;
}
</style>
