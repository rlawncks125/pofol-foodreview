<template>
  <div v-show="$props.isShow" class="z-[1000]">
    <div
      class="fixed z-[10001] inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center"
    >
      <div ref="lottieRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lottieLoadAnimation } from "@/plugin/lottie";
import { AnimationItem } from "lottie-web";
import { onMounted, ref } from "vue";

defineProps({
  size: Number,
  isShow: Boolean,
});
const lottieRef = ref<HTMLElement>();
let lottie: AnimationItem;

onMounted(() => {
  lottie = lottieLoadAnimation(lottieRef.value!, "paper");
});
</script>

<style scoped lang="scss"></style>
