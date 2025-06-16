import type { Router } from 'vue-router';
import { clearDynamicRoutes, generateRoutesFromMenu } from './route-utils';
import { localCache } from './cache';
import { CURRENT_SYSTEM_ID_KEY, CURRENT_MENU_ITEM_KEY } from '@/global/constants';
import type { AppMenuItem } from '@/types/menu';
import { useMenuStore } from '@/stores/layout/menu';
import { useTabsStore } from '@/stores/layout/tabs';

/**
 * 切换系统菜单的公共逻辑
 * @param app 应用菜单项
 * @param router 路由实例
 * @returns 生成的访问路由
 */
export async function switchSystemMenuAndRedirect(app: AppMenuItem, router: Router) {
  // 获取store实例
  const menuStore = useMenuStore();
  const tabsStore = useTabsStore();

  // 清除动态路由
  clearDynamicRoutes(router, ['base-layout', 'login', 'not-found']);

  // 清除缓存
  localCache.removeCache(CURRENT_SYSTEM_ID_KEY);
  localCache.removeCache(CURRENT_MENU_ITEM_KEY);

  // 执行系统菜单切换
  const menuList = await menuStore.switchSystemMenu(app);
  tabsStore.clearTabs();

  // 生成并添加路由
  const accessRoutes = generateRoutesFromMenu(menuList);
  accessRoutes.forEach((route) => {
    router.addRoute('base-layout', route);
  });

  // 获取当前菜单项
  const currentMenuItem = menuStore.getCurrentMenuItem;
  // 如果当前没有选中的菜单项，但有可用的菜单列表，则选中第一个
  if ((!currentMenuItem || !currentMenuItem.menuId) && menuList.length > 0) {
    // 调用 menuStore 的 setDefaultMenuItem 方法，它会自动选择第一个菜单项
    menuStore.setDefaultMenuItem();
  }

  // 处理导航
  handleNavigation(router, accessRoutes, currentMenuItem);

  return accessRoutes;
}

/**
 * 处理导航逻辑
 * @param router 路由实例
 * @param accessRoutes 访问路由
 * @param currentMenuItem 当前菜单项
 */
function handleNavigation(router: Router, accessRoutes: any[], currentMenuItem: any) {
  // 检查是否有可用的路由
  if (accessRoutes.length === 0) {
    router.replace('/');
    return;
  }

  // 如果有uriPath和frontRoute，则导航到该路径
  if (currentMenuItem && currentMenuItem.uriPath && currentMenuItem.frontRoute) {
    router.replace(currentMenuItem.uriPath);
  } else {
    // 否则导航到第一个可用路由
    if (accessRoutes.length > 0) {
      router.replace(accessRoutes[0].path);
    } else {
      router.replace('/');
    }
  }
}
