<template>
  <font-awesome :icon="['fa', props.icon]" :size="props.size" />
</template>

<script setup lang="ts">
import { FaIconName, FaIconSize } from "@/plugin/fontawesome";

const props = defineProps<{
  icon: keyof typeof FaIconName;
  size: keyof typeof FaIconSize;
}>();
</script>

<style scoped></style>
