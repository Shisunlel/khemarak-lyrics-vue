import { createApp } from "vue";
import router from "./route.js";
import App from "./App.vue";
import apolloProvider from "../apollo.provider";
import store from "./store";

import TheSidebar from "./layouts/TheSidebar.vue";

const app = createApp(App);
app.component("sidebar", TheSidebar);
app.use(router);
app.use(apolloProvider);
app.use(store);
router.isReady().then(() => {
  app.mount("#app");
});
