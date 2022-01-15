import { createApp } from "vue";
import App from "./App.vue";

import TheSidebar from "./pages/TheSidebar";

const app = createApp(App);
app.component("TheSidebar", TheSidebar);

app.mount("#app");
