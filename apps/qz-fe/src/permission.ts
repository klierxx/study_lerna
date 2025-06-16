import router from './router';
import pinia from './stores';
import { useMenuStore } from '@/stores/layout/menu';
import { localCache } from '@/utils';
import { LOGIN_TOKEN } from '@/global/constants';
import { generateRoutesFromMenu, clearDynamicRoutes } from '@/utils/route-utils';

// 白名单路由，不需要登录即可访问
const whiteList = ['/login'];

// 基础路由名称，不会被清除
const baseRouteNames = ['base-layout', 'login', 'not-found'];

// 路由是否已添加
let hasAddRoutes = false;

// 重置路由状态
export function resetRouteStatus() {
  hasAddRoutes = false;
}

router.beforeEach(async (to, from, next) => {
  // 获取token
  const hasToken = localCache.getCache(LOGIN_TOKEN) as string | undefined;
  if (hasToken) {
    // 设置页面标题
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }

    /* 已登录状态 */
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (!hasAddRoutes) {
        try {
          // 获取菜单
          const menuStore = useMenuStore(pinia);
          await menuStore.setSystemMenus();
          const menuList = menuStore.getMenus;

          // 清除可能存在的动态路由
          clearDynamicRoutes(router, baseRouteNames);

          // 生成新的路由
          const accessRoutes = generateRoutesFromMenu(menuList);
          accessRoutes.forEach((route) => {
            router.addRoute('base-layout', route);
          });

          hasAddRoutes = true;

          // 获取当前菜单项
          const currentMenuItem = menuStore.getCurrentMenuItem;

          // 如果to.path不是'/'（说明是刷新页面），先检查是否是有效路由
          if (to.path !== '/' && to.name === 'not-found') {
            // 刷新的页面可能是一个动态路由，但此时路由还没有完全注册好,尝试导航到缓存中的菜单项
            if (currentMenuItem && currentMenuItem.uriPath && currentMenuItem.frontRoute) {
              next({ path: currentMenuItem.uriPath, replace: true });
              return;
            } else if (accessRoutes.length > 0) {
              // 如果没有缓存的菜单项，使用第一个可用路由
              next({ path: accessRoutes[0].path, replace: true });
              return;
            }
          }

          // 如果to.path是'/'，且有当前菜单项则导航到当前菜单项
          if (to.path === '/' && currentMenuItem && currentMenuItem.uriPath && currentMenuItem.frontRoute) {
            next({ path: currentMenuItem.uriPath, replace: true });
            return;
          }

          // 如果目标路径是'/'，且没有当前菜单项或无效，使用第一个可用路由
          if (to.path === '/' && accessRoutes.length > 0) {
            next({ path: accessRoutes[0].path, replace: true });
            return;
          }
          next({ ...to, replace: true });
        } catch (error) {
          console.error('路由添加失败', error);
          next();
        }
      } else {
        // 路由已经添加过，如果目标是not-found页面，可能是因为动态路由未能匹配,获取菜单存储
        if (to.name === 'not-found') {
          const menuStore = useMenuStore(pinia);
          const currentMenuItem = menuStore.getCurrentMenuItem;
          if (currentMenuItem && currentMenuItem.uriPath && currentMenuItem.frontRoute) {
            next({ path: currentMenuItem.uriPath, replace: true });
            return;
          }
        }
        next();
      }
    }
  } else {
    // 未登录状态
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
  }
});
