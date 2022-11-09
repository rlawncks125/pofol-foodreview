<template>
  <div>
    <RouterView :key="route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { useLayout } from "@/store/layout";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

useLayout().setNav("chat");
</script>

<style scoped></style>
