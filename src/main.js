import { createApp } from "vue";
import { createPinia } from 'pinia';
import router from "./route.js";
import App from "./App.vue";
import apolloProvider from "../apollo.provider";

import TheSidebar from "./layouts/TheSidebar.vue";

const app = createApp(App);
const store = createPinia();
app.component("sidebar", TheSidebar);
app.use(router);
app.use(apolloProvider);
app.use(store);
router.isReady().then(() => {
  app.mount("#app");
});
