<template>
  <div>회원 가입</div>
</template>

<script setup lang="ts">
import { createUser } from "@/api/auth";

const onCreate = async () => {
  const { ok, err } = await createUser({
    username: "유저2",
    password: "1",
  });
  console.log(ok, err);
};
</script>

<style scoped></style>
