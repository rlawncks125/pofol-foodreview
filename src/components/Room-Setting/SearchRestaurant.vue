<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="content">
        <h2 class="text-[2rem] text-center">레스토랑 찾기</h2>
        <div v-if="restaurantList">
          <div v-for="(restaurant, index) in restaurantList" :key="index">
            {{ restaurant.restaurantName }}
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Restaurant } from "@/assets/swagger";

import FaIcon from "../fa-icon.vue";

const props = defineProps({
  restaurantList: Object as () => Restaurant[],
});

// const { restaurantList } = toRefs(porps);

const emits = defineEmits(["close"]);

const onClose = () => {
  emits("close");
};
</script>

<style scoped lang="scss">
.popup-style {
  @apply absolute inset-0 bg-black bg-opacity-60 z-[1000];

  .content-wrap {
    @apply m-4 bg-white px-2 py-4 overflow-auto rounded-2xl overflow-x-hidden;
    max-height: calc(100vh - 2rem);
    .close {
      @apply cursor-pointer float-right mt-[1rem] mr-[1rem] hover:text-red-600;
    }

    .content {
      @apply px-4  clear-both;
    }
  }
}
</style>
