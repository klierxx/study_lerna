import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './base-routes';

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
});

export default router;
