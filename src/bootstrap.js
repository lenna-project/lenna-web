import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import "./styles/index.scss";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

createApp(App)
  .use(route)
  .use(Toast, { position: POSITION.TOP_LEFT })
  .use(Vue3Tour)
  .mount("#app");
