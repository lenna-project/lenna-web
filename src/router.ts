import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Batch from "@/views/Batch.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/batch",
    name: "Batch",
    component: Batch,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/just/${just}",
    name: "Just",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;