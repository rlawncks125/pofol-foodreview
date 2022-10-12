<template>
  <div>로그인</div>

  <form @submit.prevent="onLogin">
    <div>
      <label for="login-id"></label>
      <input type="text" name="" id="login-id" v-model="input.username" />
    </div>
    <div>
      <label for="login-password"></label>
      <input type="text" name="" id="login-password" v-model="input.password" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { reactive } from "vue";

const { userLogin } = useUser();

const input = reactive({
  username: "",
  password: "",
});

const onLogin = async (e: any) => {
  if (input.username === "" || input.password === "") return;

  await userLogin({
    username: input.username,
    password: input.password,
  });
};
</script>

<style scoped></style>
