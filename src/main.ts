import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "@/assets/tailwind.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import "@/plugin/naverMaps";

import "tw-elements";
import "@/assets/transition.scss";

import fontawesome from "@/plugin/fontawesome";

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .use(fontawesome)
  .mount("#app");
