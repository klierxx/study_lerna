import { defineStore } from 'pinia';
import type { MenuList, MenuItem, AppMenuList, AppMenuItem } from '@/types/menu';
import { localCache } from '@/utils';
import { CURRENT_SYSTEM_ID_KEY, CURRENT_MENU_ITEM_KEY, SIDEBAR_MENU, MICRO_MENU } from '@/global/constants';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      list: <MenuList>[],
      systemList: <AppMenuList>[],
      currentSystemItem: <AppMenuItem>{},
      currentMenuItem: <MenuItem>{},
      isSystemLoading: <boolean>false,
      // 应用商店相关状态
      selectedApp: <AppMenuItem | null>null
    };
  },
  getters: {
    getMenus(): MenuList {
      return this.list;
    },
    getCurrentMenuItem(): MenuItem {
      return this.currentMenuItem;
    },
    getSystemMenus(): AppMenuList {
      return this.systemList;
    },
    getCurrentSystemItem(): AppMenuItem {
      return this.currentSystemItem;
    },
    getSystemLoading(): boolean {
      return this.isSystemLoading;
    }
  },
  actions: {
    // 设置系统loading状态
    setSystemLoading(loading: boolean) {
      this.isSystemLoading = loading;
    },
    // 设置系统菜单
    async setSystemMenus() {
      return new Promise<void>(async (resolve) => {
        // this.systemList = [
        //   { id: '1', name: '工作台', icon: 'Grid', layout: 'default', appType: 'inside', category: '默认应用' },
        //   { id: '2', name: '应用中心', icon: 'Grid', layout: 'application', appType: 'inside', category: '默认应用' },
        //   { id: '3', name: '容器', icon: 'Grid', layout: 'container', appType: 'inside', category: '默认应用' },
        //   { id: '4', name: '外部系统', icon: 'Grid', layout: 'micro', appType: 'outside'},
        // ];
        this.systemList = [
          {
            id: '1',
            name: '工作台',
            icon: 'Grid',
            layout: 'application',
            appType: 'inside',
            category: '默认应用'
          },
          {
            id: '2',
            name: '代办中心',
            icon: 'Grid',
            layout: 'default',
            appType: 'inside',
            category: '默认应用'
          }
        ];

        // 清除无效的系统菜单缓存
        this.clearInvalidSystemCache();

        // 尝试从缓存中恢复上次选中的系统菜单ID
        const cachedSystemId = this.getSystemIdFromCache();

        // 根据缓存ID查找系统菜单项，或使用默认系统菜单项
        let systemItem: AppMenuItem;
        if (this.isSystemIdValid(cachedSystemId)) {
          systemItem = this.findSystemItemById(cachedSystemId) || this.getDefaultSystemItem();
        } else {
          systemItem = this.getDefaultSystemItem();
        }

        await this.switchSystemMenu(systemItem);
        resolve();
      });
    },
    // 切换系统菜单
    async switchSystemMenu(systemItem: AppMenuItem) {
      this.setSystemLoading(true);
      // 设置当前系统菜单项
      this.currentSystemItem = systemItem;
      // 保存当前选中的系统菜单ID到本地缓存
      this.saveSystemIdToCache(systemItem.id);
      // 加载菜单数据
      await this.setMenu(systemItem.id);
      this.setSystemLoading(false);

      // 返回菜单数据，供外部使用
      return this.list;
    },
    // 设置选中的应用
    setSelectedApp(app: AppMenuItem | null) {
      this.selectedApp = app;
    },
    // 重置选中的应用
    resetSelectedApp() {
      this.selectedApp = null;
    },
    // 根据系统ID设置菜单
    setMenu(id: string | number) {
      // 将ID转换为字符串进行比较，确保类型一致
      const systemId = String(id);
      if (systemId === '1') {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.list = [
              {
                menuId: 6,
                menuName: '工作台',
                frontRoute: '/dashboard',
                uriPath: '/application/work'
              }
            ];
            this.initMenuSelection();
            resolve();
          }, 1000);
        });
      } else if (systemId === '2') {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.list = SIDEBAR_MENU;
            this.initMenuSelection();
            resolve();
          }, 1000);
        });
      } else {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.list = MICRO_MENU;
            this.initMenuSelection();
            resolve();
          }, 1000);
        });
      }
    },

    // 获取系统菜单ID的缓存
    getSystemIdFromCache(): string | null {
      return localCache.getCache(CURRENT_SYSTEM_ID_KEY);
    },

    // 保存系统菜单ID到缓存
    saveSystemIdToCache(id: string | number): void {
      localCache.setCache(CURRENT_SYSTEM_ID_KEY, id);
    },

    // 检查系统ID是否在当前系统列表中存在
    isSystemIdValid(systemId: string | number | null): boolean {
      if (!systemId) return false;
      return this.systemList.some((item) => item.id === String(systemId));
    },

    // 获取默认系统菜单项
    getDefaultSystemItem(): AppMenuItem {
      return this.systemList.length > 0
        ? this.systemList[0]
        : { id: 'default', name: '默认', icon: '', layout: '', appType: 'inside' };
    },

    // 清除无效的系统菜单缓存
    clearInvalidSystemCache(): void {
      const cachedSystemId = this.getSystemIdFromCache();
      if (cachedSystemId && !this.isSystemIdValid(cachedSystemId)) {
        localCache.removeCache(CURRENT_SYSTEM_ID_KEY);
        localCache.removeCache(CURRENT_MENU_ITEM_KEY);
      }
    },

    // 根据ID查找系统菜单项
    findSystemItemById(id: string | number): AppMenuItem | null {
      return this.systemList.find((item) => item.id === String(id)) || null;
    },

    // 获取菜单项缓存
    getMenuItemFromCache(): { menuId: number; uriPath: string } | null {
      return localCache.getCache(CURRENT_MENU_ITEM_KEY);
    },

    // 保存当前菜单项到缓存
    saveMenuItemToCache(menuItem: { menuId: number; uriPath: string }): void {
      localCache.setCache(CURRENT_MENU_ITEM_KEY, menuItem);
    },

    // 初始化菜单选中状态，优先使用缓存，没有则使用默认值
    initMenuSelection() {
      const cachedMenuItem = this.getMenuItemFromCache();
      if (cachedMenuItem) {
        const menuItem = this.findMenuItem(this.list, cachedMenuItem.menuId);
        if (menuItem) {
          this.setCurrentMenuItem(menuItem);
          return;
        }
      }
      this.setDefaultMenuItem();
    },

    // 在菜单树中查找匹配的菜单项
    findMenuItem(menus: MenuList, targetMenuId: number): MenuItem | null {
      for (const menu of menus) {
        if (menu.menuId === targetMenuId) {
          return menu;
        }
        if (menu.children && menu.children.length > 0) {
          const found = this.findMenuItem(menu.children, targetMenuId);
          if (found) return found;
        }
      }
      return null;
    },

    // 设置默认的菜单项
    setDefaultMenuItem() {
      if (this.list.length > 0) {
        // 如果第一个菜单项有子菜单，则递归找到最终的子菜单
        if (this.list[0].children && this.list[0].children.length > 0) {
          const childrenList = this.list[0].children;
          this.findAndSetDefaultLeafMenuItem(childrenList);
        } else {
          // 如果没有子菜单，则设为当前选中项并缓存
          this.setCurrentMenuItem(this.list[0]);
          this.saveCurrentMenuItemToCache();
        }
      } else {
        this.setCurrentMenuItem(<MenuItem>{});
      }
    },

    // 递归设置子菜单中的默认菜单项
    findAndSetDefaultLeafMenuItem(list: MenuList) {
      if (list.length > 0) {
        // 如果第一个菜单项有子菜单，则递归找到最终的子菜单
        if (list[0].children && list[0].children.length > 0) {
          this.findAndSetDefaultLeafMenuItem(list[0].children);
        } else {
          // 如果没有子菜单，则设为当前选中项并缓存
          this.setCurrentMenuItem(list[0]);
          this.saveCurrentMenuItemToCache();
        }
      } else {
        this.setCurrentMenuItem(<MenuItem>{});
      }
    },

    // 保存当前选中的菜单项到本地缓存
    saveCurrentMenuItemToCache() {
      if (this.currentMenuItem?.menuId !== undefined) {
        // 只保存必要的信息到缓存
        this.saveMenuItemToCache({
          menuId: this.currentMenuItem.menuId,
          uriPath: this.currentMenuItem.uriPath || ''
        });
      }
    },

    // 设置当前选中菜单
    setCurrentMenuItem(menuItem: MenuItem) {
      this.currentMenuItem = menuItem;
    }
  }
});
