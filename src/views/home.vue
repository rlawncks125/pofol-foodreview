<template>
  <div>
    <p>home</p>
    <!-- 메인소개  -->
    <section
      class="relative bg-graident-animation w-full h-[50vw] min-h-[20rem] max-h-[70vh] my-2 overflow-hidden"
    >
      <!-- 텍스트 -->
      <p
        class="absolute text-white text-[1.5rem] font-bold top-[2rem] left-[1rem] z-[100]"
      >
        아녕하ㅔ용<br />텟트입니다
      </p>

      <!-- 이미지 -->
      <img
        src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1654624758/%ED%8F%AC%ED%94%841_isxw3h.jpg"
        class="absolute hidden sm:block right-4 top-4 w-[90vw] max-w-[24rem]"
      />

      <!-- 입장 버튼 -->
      <div
        class="btn-type-arrow !absolute left-4 bottom-4 text-[1rem] ml-1 !bg-blue-400"
        @click="moveFoodChat"
      >
        푸드 채팅 입장
      </div>
    </section>

    <div>설명 불라 불라</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const moveFoodChat = () => {
  router.push("chat");
};
</script>

<style lang="scss" scoped>
.bg-graident-animation {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: graident-animation 10s ease infinite;
}

@keyframes graident-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
