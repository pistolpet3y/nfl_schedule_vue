import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/views/HomeView.vue";
import InfoView from "/src/views/InfoView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/info", component: InfoView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
