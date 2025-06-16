<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      :background-color="sidebar.bgColor"
      :text-color="sidebar.textColor"
      router
      @select="handleSelect"
    >
      <template v-for="item in menuData">
        <template v-if="item.children">
          <el-sub-menu :index="item.uriPath" :key="item.menuId">
            <template #title>
              <el-icon>
                <component :is="item.menuIcon"></component>
              </el-icon>
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu v-if="subItem.children" :index="subItem.uriPath" :key="subItem.menuId + 'sub'">
                <template #title>{{ subItem.menuName }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.uriPath">
                  {{ threeItem.menuName }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.uriPath" :key="subItem.menuId + 'item'">
                {{ subItem.menuName }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.uriPath" :key="item.menuId">
            <el-icon>
              <component :is="item.menuIcon"></component>
            </el-icon>
            <template #title>{{ item.menuName }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="LSidebar">
  import { computed } from 'vue';
  import { useSidebarStore } from '@/stores/layout/sidebar';
  import { useRoute } from 'vue-router';
  import { useMenuStore } from '@/stores/layout/menu';

  const route = useRoute();
  const onRoutes = computed(() => {
    return route.path;
  });

  const sidebar = useSidebarStore();
  const menuStore = useMenuStore();
  // 将menuData改为响应式的computed属性
  const menuData = computed(() => menuStore.getMenus);

  // 处理菜单选择事件
  const handleSelect = (index: string) => {
    // 查找选中的菜单项
    const findMenuItem = (menus: any[], path: string): any => {
      for (const menu of menus) {
        if (menu.uriPath === path) {
          return menu;
        }
        if (menu.children && menu.children.length > 0) {
          const found = findMenuItem(menu.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const selectedMenuItem = findMenuItem(menuData.value, index);
    if (selectedMenuItem) {
      // 更新当前选中的菜单项并保存到缓存
      menuStore.setCurrentMenuItem(selectedMenuItem);
      menuStore.saveCurrentMenuItemToCache();
    }
  };
</script>

<style scoped lang="scss">
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }

    .sidebar-el-menu {
      min-height: 100%;

      &:not(.el-menu--collapse) {
        width: 260px;
      }
    }
  }
</style>
