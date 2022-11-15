<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="xmark" size="3x" />
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Room } from "@/assets/swagger";
import FaIcon from "@/components/fa-icon.vue";

const props = defineProps({
  room: Object as () => Room,
});

const emits = defineEmits(["close", "editRoom"]);

const onClose = () => {
  emits("close");
};
</script>

<style scoped></style>
