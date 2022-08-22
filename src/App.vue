<template>
  <div>main</div>
  {{ count }}
  <button @click="countPlugs">증가</button>
  <fa-icon icon="moon" size="2xl" />
  <router-view />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userCount } from "./store";
import FaIcon from "./components/fa-icon.vue";

const { count } = storeToRefs(userCount());
const { countPlugs } = userCount();
</script>

<style scoped></style>
