import { defineStore } from "pinia";
import { onBeforeMount, ref } from "vue";

type LayoutNav = "home" | "chat";

export const useLayout = defineStore("layout", () => {
  const layout = ref<{ nav: LayoutNav }>({
    nav: "home",
  });

  const setNav = (_layout: LayoutNav) => {
    layout.value.nav = _layout;
  };

  return { layout, setNav };
});
