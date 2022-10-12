import { onMounted, onUnmounted, ref } from "vue";

export const useDarkmode = () => {
  // 다크모드
  const isDarkMode = ref(false);

  const changeDarkmode = () => {
    document.documentElement.classList.toggle("dark");
    isDarkMode.value =
      document.documentElement.classList.value.includes("dark");
  };
  const setDarkmode = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      isDarkMode.value = true;
    } else {
      document.documentElement.classList.remove("dark");
      isDarkMode.value = false;
    }
  };

  onMounted(() => {
    // 다크모드 감지
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setDarkmode);
  });
  onUnmounted(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", setDarkmode);
  });

  return {
    isDarkMode,
    changeDarkmode,
  };
};
