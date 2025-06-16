<template>
  <div class="horizontal-menu">
    <div
      v-for="item in systemMenu"
      :key="item.id"
      class="menu-item"
      :class="{ active: activeItemId === item.id }"
      @click="handleItemClick(item)"
    >
      <el-icon v-if="item.icon" class="icon" :size="20">
        <component :is="item.icon" />
      </el-icon>
      <span class="text">{{ item.name }}</span>
    </div>
    <application-center ref="appCenterRef" @app-selected="handleAppSelected" />
  </div>
</template>

<script setup lang="ts" name="LSystem">
  import { ref, computed, watch, onMounted } from 'vue';
  import { useMenuStore } from '@/stores/layout/menu';
  import type { AppMenuList, AppMenuItem } from '@/types/menu';
  import { switchSystemMenuAndRedirect } from '@/utils';
  import router from '@/router';
  import ApplicationCenter from '@/components/ApplicationCenter.vue';

  const emit = defineEmits(['item-click']);
  const menuStore = useMenuStore();
  const systemMenu = computed<AppMenuList>(() => menuStore.getSystemMenus);
  const currentSystemItem = computed(() => menuStore.getCurrentSystemItem);
  const activeItemId = ref<string | number>('');
  const appCenterRef = ref<InstanceType<typeof ApplicationCenter> | null>(null);

  // 同步当前系统菜单ID
  watch(
    () => currentSystemItem.value.id,
    (newId) => {
      if (newId) {
        activeItemId.value = newId;
      }
    },
    { immediate: true }
  );

  // 监听系统菜单变化当没有菜单选中时加载第一个子菜单
  watch(
    systemMenu,
    async (newMenu) => {
      if (newMenu.length > 0 && !activeItemId.value) {
        activeItemId.value = newMenu[0].id;
        await menuStore.switchSystemMenu(newMenu[0]);
      }
    },
    { immediate: true }
  );

  // 点击系统菜单
  const handleItemClick = async (item: AppMenuItem) => {
    if (activeItemId.value === item.id) return;
    activeItemId.value = item.id;
    emit('item-click', item);

    // 重置应用中心状态
    if (appCenterRef.value) {
      appCenterRef.value.resetAppCenter();
    }
    // 重置全局应用选择状态
    menuStore.resetSelectedApp();

    // 使用公共函数处理菜单切换逻辑
    await switchSystemMenuAndRedirect(item, router);
  };

  // 处理应用选中事件
  const handleAppSelected = (selected: boolean) => {
    // 当应用被选中时，重置系统菜单的选中状态
    if (selected) {
      resetActiveState();
    }
  };

  // 重置系统菜单选中状态
  const resetActiveState = () => {
    activeItemId.value = '';
  };

  // 组件挂载时，同步激活状态
  onMounted(() => {
    if (currentSystemItem.value.id) {
      activeItemId.value = currentSystemItem.value.id;
    }
  });
</script>

<style scoped lang="scss">
  .horizontal-menu {
    height: 100%;
    display: flex;
    align-items: center;

    .menu-item {
      display: flex;
      width: 120px;
      height: 78px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 0px 0px 8px 8px;
      cursor: pointer;
      position: relative;
      transition: background 0.3s ease;
      box-sizing: border-box;
      text-align: center;

      .icon {
        font-size: 20px;
        color: var(--header-text-color);
        flex-shrink: 0;
      }

      .text {
        font-size: 14px;
        color: var(--header-text-color);
      }

      &.active {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(14, 146, 248, 0.1) 100%);

        &::after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background-color: #0e92f8;
        }
      }
    }
  }
</style>
