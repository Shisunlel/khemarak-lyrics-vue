import { createApp } from "vue";
import App from "./App.vue";
import apolloProvider from "../apollo.provider";

import TheSidebar from "./pages/TheSidebar";

const app = createApp(App);
app.component("TheSidebar", TheSidebar);
app.use(apolloProvider);
app.mount("#app");
