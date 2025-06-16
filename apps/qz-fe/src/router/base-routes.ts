import type { RouteRecordRaw } from 'vue-router';
// const DynamicView = () => import('@/views/layout/components/DynamicView.vue')
/**
 * 基础路由配置
 * 包含应用的核心路由：首页重定向、主布局、登录页、404页面
 */
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('@/layout/index.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/views/not-found/index.vue')
  }
];
