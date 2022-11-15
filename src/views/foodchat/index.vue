<template>
  <div>
    <RouterView v-if="token" :key="route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { useLayout } from "@/store/layout";
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Socket from "@/api/Socket";

const route = useRoute();
const router = useRouter();
const { token } = storeToRefs(useUser());

useLayout().setNav("chat");

onBeforeMount(() => {
  if (!token.value) {
    alert("로그인을 하세요.");
    router.push("/");
  }
});
</script>

<style scoped></style>
