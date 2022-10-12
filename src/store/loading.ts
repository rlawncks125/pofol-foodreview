import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoading = defineStore("loading", () => {
  const isLoading = ref(false);

  const on = () => {
    isLoading.value = true;
  };

  const off = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    on,
    off,
  };
});
