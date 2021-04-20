import { createApp } from "vue";
import App from "./App.vue";
import route from './router';
import "./index.css";

createApp(App).use(route).mount("#app");
