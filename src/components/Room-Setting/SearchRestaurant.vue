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

<style scoped lang="scss"></style>
