import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/tailwind.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import "@/plugin/naverMaps";

import fontawesome from "@/plugin/fontawesome";

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .use(fontawesome)
  .mount("#app");
