// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 👈 usa el router que definiste

import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(router);     // 👈 conecta el router
app.mount("#app");
