export interface MenuItem {
  menuId: number;
  menuName: string;
  frontRoute?: string;
  uriPath: string;
  menuCode?: string;
  menuLevel?: number;
  menuOrder?: number;
  parentCode?: string;
  menuIcon?: string | null;
  menuGroup?: number;
  uriName?: string | null;
  uriDesc?: string | null;
  uriMethod?: string | null;
  confType?: number;
  children?: MenuItem[] | null;
}

export type MenuList = MenuItem[];

export interface AppMenuItem {
  id: string | number;
  name: string;
  icon?: string;
  layout?: string;
  appType?: string;
  category?: string;
}

export type AppMenuList = AppMenuItem[];
