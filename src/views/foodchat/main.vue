<template>
  <div>chat main</div>
  <!-- 내정보 -->
  <section class="my-8">
    <div class="flex flex-col items-center md:self-start">
      <img
        class="border rounded-full w-[150px] h-[150px] object-cover object-center mb-4"
        :src="userInfo?.avatar || nullAvatar"
        alt=""
      />
      <!-- 내용 -->
      <div class="pt-4 px-4 w-[100%] md:w-[50%]">
        <div class="my-1">
          <label for="user-nickname" class="label-type-0">닉네임</label>
          <input
            type="text"
            name=""
            id="user-nickname"
            class="input-type-0 disabled:cursor-not-allowed"
            :value="userInfo?.username"
            disabled
          />
        </div>
        <div class="my-1">
          <label for="user-dsc" class="label-type-0">소개</label>
          <textarea
            ref="textareaRef"
            type="text"
            name=""
            id="user-dsc"
            class="input-type-0 resize-none !py-1"
            :value="userInfo?.dsc"
            disabled
          />
        </div>
      </div>
    </div>
  </section>
  <!-- 방목록 & 방찾기 -->
  <section
    class="max-w-container mx-auto flex flex-col gap-8 md:gap-4 md:flex-row justify-between px-2"
  >
    <!-- 방목록 -->
    <div class="w-full md:w-[50%]">
      <RoomList :row-per-page="2" :show-count="3" />
    </div>
    <!-- 방찾기 -->
    <div class="w-full md:w-[50%]">
      <RoomSearch :row-per-page="2" :show-count="3" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { defineAsyncComponent, onMounted, ref } from "vue";
import { nullAvatar } from "@/common/imageUrl";

// import RoomList from "@/views/foodchat/RoomList.vue";
// import RoomSearch from "@/views/foodchat/RoomSearch.vue";

const RoomList = defineAsyncComponent(
  // () => import("@/views/foodchat/RoomList.vue")
  {
    loader: () => import("@/views/foodchat/RoomList.vue"),
  }
);

const RoomSearch = defineAsyncComponent(
  () => import("@/views/foodchat/RoomSearch.vue")
);

const { token, userInfo } = storeToRefs(useUser());

const textareaRef = ref<HTMLElement>();

const textareaAutoHieght = () => {
  textareaRef.value!.style.height = "auto";
  const scrollHeight = textareaRef.value!.scrollHeight + 4;
  textareaRef.value!.style.height = scrollHeight + "px";
};

onMounted(() => {
  textareaAutoHieght();
});
</script>

<style scoped></style>
