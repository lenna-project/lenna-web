import { createApp } from "vue";
import App from "./App.vue";
import route from './router';
import "./styles/index.scss";

createApp(App).use(route).mount("#app");
