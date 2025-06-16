import type { RouteRecordRaw, Router } from 'vue-router';
import type { MenuList } from '@/types/menu';

const viewModules = import.meta.glob('@/views/**/index.vue');
export function getComponent(frontRoute: string): any {
  const componentPath = `/src/views${frontRoute}/index.vue`;
  if (viewModules[componentPath]) {
    return viewModules[componentPath];
  }

  return viewModules['@/views/not-found/index.vue'] || (() => import('@/views/not-found/index.vue'));
}

/**
 * 清理现有的动态路由
 * @param router 路由实例
 * @param baseRouteNames 基础路由名称数组（不会被清除）
 */
export function clearDynamicRoutes(router: Router, baseRouteNames: string[] = []): void {
  try {
    const existingRoutes = router.getRoutes();
    existingRoutes.forEach((route) => {
      if (route.name && !baseRouteNames.includes(String(route.name))) {
        // 安全地移除路由
        try {
          router.removeRoute(String(route.name));
        } catch (error) {
          console.error(`移除路由失败: ${String(route.name)}`, error);
        }
      }
    });
  } catch (error) {
    console.error('清理动态路由失败:', error);
  }
}

export function generateRoutesFromMenu(menuList: MenuList): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 递归生成路由
  function addRoutes(items: MenuList) {
    items.forEach((item) => {
      // 如果有路径和前端路由，添加路由
      if (item.uriPath && item.frontRoute) {
        const route = {
          path: item.uriPath,
          name: `route-${item.menuId}`,
          component: getComponent(item.frontRoute),
          meta: {
            title: item.menuName,
            menuId: item.menuId
          }
        };
        routes.push(route);
      }
      if (item.children && item.children.length > 0) {
        addRoutes(item.children);
      }
    });
  }
  addRoutes(menuList);
  return routes;
}
