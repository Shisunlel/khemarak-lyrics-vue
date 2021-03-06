import { createApp } from "vue";
import router from "./route.js";
import App from "./App.vue";
import apolloProvider from "../apollo.provider";

import TheSidebar from "./layouts/TheSidebar";

const app = createApp(App);
app.component("sidebar", TheSidebar);
app.use(router);
app.use(apolloProvider);
app.mount("#app");
