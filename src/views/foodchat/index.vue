<template>
  <div>
    <RouterView v-if="token" :key="route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { token } = storeToRefs(useUser());

onBeforeMount(() => {
  if (!token.value) {
    alert("로그인을 하세요.");
    router.push("/login");
  }
});
</script>

<style scoped></style>
