import { defineStore } from "pinia";
import { ref } from "vue";

export const userCount = defineStore(
  "conunt",
  () => {
    const count = ref(0);

    const countPlugs = () => {
      count.value = count.value + 1;
    };

    return { count, countPlugs };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["count"],
    },
  }
);
