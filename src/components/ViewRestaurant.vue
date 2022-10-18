<template>
  <div v-if="restaurant" class="popup-style">
    <div class="content-wrap max-w-container lg:!mx-auto">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="clear-both text-center pt-4 pb-2 text-[1.8rem] font-bold">
        {{ restaurant.restaurantName }}
      </div>
      <div
        class="h-[40vw] max-h-[25rem] translate-x-[-.5rem]"
        :style="{ width: 'calc(100% + 1rem)' }"
      >
        <div
          class="bg-yellow-100 h-full flex justify-center items-center flex-col"
        >
          <FaIcon icon="cloud-arrow-down" size="3x" />
          <p>이미지가 없습니다.</p>
        </div>
      </div>
      <button v-if="props?.isSuperUser" @click="onDelete">삭제 하기</button>
      <div class="content">
        <p>{{ restaurant.location }}</p>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteRestaurant } from "@/api/Restaurant";
import { Restaurant } from "@/assets/swagger";
import { useLoading } from "@/store/loading";
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import FaIcon from "./fa-icon.vue";

const props = defineProps({
  isSuperUser: Boolean,
});

const emits = defineEmits(["close", "delete"]);

const restaurant = ref<Restaurant>();

const setInfo = (_restaurant: Restaurant) => {
  console.log(_restaurant);
  restaurant.value = _restaurant;
};

const onClose = () => {
  emits("close", true);
};

const onDelete = async () => {
  if (!restaurant.value) return;

  if (!confirm("정말로 삭제하시겠습니까?")) return;

  useLoading().on();
  const { ok } = await deleteRestaurant(restaurant.value.id);

  if (ok) {
    emits("delete", restaurant.value);
  }
  useLoading().off();
};

defineExpose({
  setInfo,
});
</script>

<style scoped lang="scss">
.popup-style {
  @apply absolute inset-0 bg-gray-400 z-[1000];

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
