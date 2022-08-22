import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/plugin/naverMaps";
import "@/assets/tailwind.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import { FontAwesomeIcon } from "@/plugin/fontawesome";

createApp(App)
  .use(createPinia().use(piniaPersist))
  .use(router)
  .component("font-awesome", FontAwesomeIcon)
  .mount("#app");
