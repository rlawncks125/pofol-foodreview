<script setup lang="ts">
import { Room } from "@/assets/swagger";
import { ref } from "vue";
import { toRefs } from "vue";

const props = defineProps({
  room: Object as () => Room,
  userTheme: String,
});

const { room, userTheme } = toRefs(props);

const emit = defineEmits<{
  (e: "click:openCreateRoom", isOpen: boolean): void;
  (e: "click:openSearchRestaurant", isOpen: boolean): void;
  (e: "click:openSetting", isOpen: boolean): void;
}>();

const endELRef = ref<HTMLElement>();

defineExpose({ endELRef });
</script>

<!-- ref="endELRef" -->
<template>
  <div
    ref="endELRef"
    class="bg-blue-400"
    :style="{ backgroundColor: userTheme || 'rgb(96,165,250)' }"
  >
    <div v-if="room">
      <p class="text-white text-[2rem] text-center dark:text-black">
        {{ room.roomName }}
      </p>
      <div class="flex justify-between">
        <button
          class="btn-type-0 m-2"
          @click="() => emit('click:openCreateRoom', true)"
        >
          음식점 등록하기
        </button>
        <div class="flex">
          <button
            class="btn-type-0 m-2"
            @click="emit('click:openSearchRestaurant', true)"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <button
            class="btn-type-0 m-2"
            @click="emit('click:openSetting', true)"
          >
            설정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
