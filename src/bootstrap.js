import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import "./styles/index.scss";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(route)
  .use(Toast, { position: POSITION.TOP_LEFT })
  .mount("#app");
