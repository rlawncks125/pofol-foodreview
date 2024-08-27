<script setup lang="ts">
import { type Restaurant } from "@/assets/swagger/index";
import { toRefs } from "vue";

const props = defineProps({
  selectResturant: Object as () => Restaurant,
});
const { selectResturant } = toRefs(props);

const emit = defineEmits(["click:openRestarunt"]);
</script>

<template>
  <div
    v-if="selectResturant"
    @click="() => emit('click:openRestarunt')"
    class="absolute bottom-10 w-full flex justify-center dark:text-black"
  >
    <div
      class="bg-slate-100 w-[40rem] max-w-3xl p-2 mx-4 rounded-xl flex flex-col cursor-pointer shadow-lg shadow-black/40 hover:scale-105"
    >
      <p class="font-bold text-[1.3rem] fle flex-col items-center">
        <span>
          {{ selectResturant.restaurantName }}
        </span>
        <span>
          <StarFill
            :fill="selectResturant.avgStar"
            :star-size="2"
            :star-num="5"
          />
        </span>
      </p>
      <!-- <p>지역 : {{ selectResturant.location }}</p> -->
      <div class="flex justify-between flex-wrap gap-2">
        <div v-if="selectResturant.specialization.length > 0">
          <h1 class="font-bold text-[1.2rem]">분야</h1>
          <div class="flex gap-2">
            <div
              v-for="(specialization, index) in selectResturant.specialization"
              :key="index"
              class="rounded-full p-2 px-4 bg-yellow-500 text-white font-bold"
            >
              {{ specialization }}
            </div>
          </div>
        </div>
        <div v-if="selectResturant.hashTags.length > 0">
          <h1 class="font-bold text-[1.2rem]">해시태그</h1>
          <div class="flex gap-2">
            <div
              v-for="(hashtag, index) in selectResturant.hashTags"
              :key="index"
              class="rounded-full p-2 px-4 bg-blue-400 text-white font-bold"
            >
              #{{ hashtag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
