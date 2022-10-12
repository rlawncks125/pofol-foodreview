<template>
  <div>chat main</div>
  <p>{{ token }}</p>
  <!-- 참여중인방 -->
  <!-- 방찾기 -->
  <!-- 방만들기 -->
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";

const { token } = storeToRefs(useUser());
</script>

<style scoped></style>
