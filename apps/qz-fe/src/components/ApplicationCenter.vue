<template>
  <div class="menu-item" @mouseenter="showAppCard" @mouseleave="hideAppCard">
    <div class="app-item" :class="{ active: isActive }">
      <el-icon class="icon" :size="20">
        <component :is="currentIcon" />
      </el-icon>
      <span class="text">{{ currentName }}</span>
    </div>
    <transition name="slide-fade">
      <div class="app-card" v-show="isDropdownVisible">
        <div v-for="(category, index) in appCategories" :key="index" class="app-category">
          <div class="category-title">{{ category.title }}</div>
          <div class="category-divider"></div>
          <div class="app-grid">
            <div v-for="app in category.apps" :key="app.id" class="app-grid-item" @click="selectApplication(app)">
              <el-icon class="app-icon" :size="24">
                <component :is="app.icon" />
              </el-icon>
              <div class="app-name">{{ app.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import type { AppMenuList, AppMenuItem } from '@/types/menu';
  import { switchSystemMenuAndRedirect } from '@/utils';
  import router from '@/router';
  import { useMenuStore } from '@/stores/layout/menu';

  interface AppCategory {
    title: string;
    apps: AppMenuList;
  }

  const props = defineProps({
    icon: {
      type: String,
      default: () => 'Grid'
    },
    name: {
      type: String,
      default: '应用商店'
    },
    applications: {
      type: Array as () => AppMenuList,
      default: () => [
        {
          id: '3',
          name: '消息',
          icon: 'ChatDotRound',
          category: '默认应用',
          layout: 'default',
          appType: 'inside'
        },
        {
          id: '4',
          name: '日历',
          icon: 'Calendar',
          category: '默认应用',
          layout: 'default',
          appType: 'inside'
        },
        {
          id: '5',
          name: '云文档',
          icon: 'Document',
          category: '默认应用',
          layout: 'default',
          appType: 'inside'
        },
        {
          id: '6',
          name: '知识库',
          icon: 'Collection',
          category: '默认应用',
          layout: 'default',
          appType: 'inside'
        },
        {
          id: '7',
          name: '会议室',
          icon: 'VideoPlay',
          category: '协作工具',
          layout: 'default',
          appType: 'inside'
        },
        {
          id: '8',
          name: '问卷',
          icon: 'Tickets',
          category: '协作工具',
          layout: 'application',
          appType: 'inside'
        }
      ]
    }
  });

  const emit = defineEmits(['app-selected']);

  const menuStore = useMenuStore();

  const isDropdownVisible = ref(false);
  const isActive = ref(false);
  const currentIcon = ref(props.icon);
  const currentName = ref(props.name);
  const defaultName = props.name;
  const defaultIcon = props.icon;

  // 重置应用中心状态
  const resetAppCenter = () => {
    menuStore.resetSelectedApp();
    currentName.value = defaultName;
    currentIcon.value = defaultIcon;
    isActive.value = false;
  };

  // 监听全局状态中的应用选择状态
  watch(
    () => menuStore.selectedApp,
    (app) => {
      if (app) {
        currentName.value = app.name;
        isActive.value = true;
      } else {
        resetAppCenter();
      }
    },
    { immediate: true }
  );

  // 根据分类整理应用
  const appCategories = computed<AppCategory[]>(() => {
    const categories: Record<string, AppMenuList> = {};

    // 按类别分组应用
    props.applications.forEach((app) => {
      const category = app.category || '默认应用';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(app);
    });

    // 转换为数组形式
    return Object.keys(categories).map((title) => ({
      title,
      apps: categories[title]
    }));
  });

  const showAppCard = () => {
    isDropdownVisible.value = true;
  };

  const hideAppCard = () => {
    isDropdownVisible.value = false;
  };

  const selectApplication = async (app: AppMenuItem) => {
    // 更新全局状态
    menuStore.setSelectedApp(app);

    isDropdownVisible.value = false;
    // 通知父组件 LSystem 更新系统菜单的选中状态
    emit('app-selected', true);

    // 使用公共函数处理菜单切换逻辑
    await switchSystemMenuAndRedirect(app, router);
  };

  // 组件挂载时，检查是否有选中的应用
  onMounted(() => {
    const selectedApp = menuStore.selectedApp;
    if (selectedApp) {
      currentName.value = selectedApp.name;
      isActive.value = true;
    }
  });

  // 暴露方法给父组件
  defineExpose({
    resetAppCenter
  });
</script>

<style scoped lang="scss">
  .menu-item {
    position: relative;

    .app-item {
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

      &:hover {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(14, 146, 248, 0.1) 100%);
      }

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

    .app-card {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 376px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      z-index: 100;
      padding: 16px;
      transform-origin: top center;
      max-height: 600px;
      overflow-y: auto;

      .app-category {
        margin-bottom: 16px;

        .category-title {
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          margin-bottom: 12px;
          padding-left: 4px;
          text-align: left;
        }

        .category-divider {
          height: 1px;
          background-color: #ebeef5;
          margin: 16px 0;
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;

          .app-grid-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px 0;
            cursor: pointer;
            transition: all 0.2s ease;
            border-radius: 4px;

            &:hover {
              background-color: #f5f7fa;
            }

            .app-icon {
              margin-bottom: 8px;
              font-size: 24px;
              color: #409eff;
            }

            .app-name {
              font-size: 12px;
              color: #606266;
            }
          }
        }
      }
    }
  }

  // 动画效果
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from {
    transform: translateX(-50%) translateY(-10px);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(-50%) translateY(-10px);
    opacity: 0;
  }
</style>
