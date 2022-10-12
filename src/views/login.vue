<template>
  <div class="px-2 max-w-container mx-auto">
    <h2 class="text-[3rem]">로그인</h2>
    <br />
    <form @submit.prevent="onLogin">
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="floating_userName"
          id="floating_userName"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="input.username"
        />
        <label
          for="floating_userName"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >User Name</label
        >
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="input.password"
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        로그인
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from "@/store/loading";
import { useUser } from "@/store/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { userLogin } = useUser();

const input = reactive({
  username: "",
  password: "",
});

const onLogin = async (e: any) => {
  if (input.username === "" || input.password === "") return;

  useLoading().on();
  const { ok, err } = await userLogin({
    username: input.username,
    password: input.password,
  });
  useLoading().off();

  if (ok) {
    alert("로그인을 성공하였습니다.");
    router.push("/chat");
  } else {
    alert(err);
  }
};
</script>

<style scoped></style>
