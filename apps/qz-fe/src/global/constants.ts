export const LOGIN_TOKEN = 'login_token';
export const CURRENT_SYSTEM_ID_KEY = 'current_system_id';
export const CURRENT_MENU_ITEM_KEY = 'current_menu_item';
export const SIDEBAR_MENU = [
  {
    menuId: 0,
    menuName: '主题',
    frontRoute: '/theme',
    uriPath: '/main/theme',
    menuIcon: 'Tickets'
  },
  {
    menuId: 1,
    menuName: '一级菜单1',
    frontRoute: '/main/menu1',
    uriPath: '/main/menu1',
    menuIcon: 'Tickets'
  },
  {
    menuId: 2,
    menuName: '一级菜单2',
    frontRoute: '',
    uriPath: '2',
    menuIcon: 'Tickets',
    children: [
      {
        menuId: 21,
        menuName: '二级菜单2-1',
        frontRoute: '/main/menu2-1',
        uriPath: '/main/menu2-1',
        parentCode: '1'
      },
      {
        menuId: 22,
        menuName: '二级菜单2-2',
        frontRoute: '/main/menu2-2',
        uriPath: '/main/menu2-2',
        parentCode: '1'
      }
    ]
  },
  {
    menuId: 3,
    menuName: '一级菜单3',
    frontRoute: '',
    uriPath: '3',
    menuIcon: 'Tickets',
    children: [
      {
        menuId: 31,
        menuName: '二级菜单3-1',
        frontRoute: '/main/menu3-1',
        uriPath: '/main/menu3-1',
        parentCode: '2'
      },
      {
        menuId: 32,
        menuName: '二级菜单3-2',
        frontRoute: '',
        uriPath: '',
        parentCode: '2',
        children: [
          {
            menuId: 321,
            menuName: '三级菜单3-2-1',
            frontRoute: '/main/menu3-2-1',
            uriPath: '/main/menu3-2-1',
            parentCode: '3'
          },
          {
            menuId: 322,
            menuName: '三级菜单3-2-2',
            frontRoute: '/main/menu3-2-2',
            uriPath: '/main/menu3-2-2',
            parentCode: '3'
          }
        ]
      }
    ]
  }
];
export const MICRO_MENU = [
  {
    menuId: 7,
    menuName: '一级菜单',
    frontRoute: '',
    uriPath: '7',
    menuIcon: 'Tickets',
    children: [
      {
        menuId: 71,
        menuName: '二级菜单1',
        frontRoute: '/demo',
        uriPath: '/micro/menu1',
        parentCode: '1'
      },
      {
        menuId: 72,
        menuName: '二级菜单2',
        frontRoute: '',
        uriPath: '72',
        parentCode: '1',
        children: [
          {
            menuId: 721,
            menuName: '三级菜单2-1',
            frontRoute: '/demo',
            uriPath: '/micro/menu3-2-1',
            parentCode: '3'
          },
          {
            menuId: 722,
            menuName: '三级菜单2-2',
            frontRoute: '/demo',
            uriPath: '/micro/menu3-2-2',
            parentCode: '3'
          }
        ]
      }
    ]
  }
];
