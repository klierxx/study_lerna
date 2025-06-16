import { createPinia } from 'pinia';
import type { App } from 'vue';

import { useCommonStore } from './common';
import { useMenuStore } from './layout/menu';
import { useThemeStore } from './layout/theme';

// 1. 创建 Pinia 实例
const pinia = createPinia();

// 2. 注册 Pinia 插件到 Vue 应用的函数
export function setupStore(app: App<Element>) {
  app.use(pinia);

  // 初始化主题
  const themeStore = useThemeStore();
  themeStore.initTheme();
}

// 3. 统一导出所有 store hooks，方便在组件中使用
// 这样在组件中就可以通过 import { useLoginStore, useListStore } from '@/stores' 来导入
export { useMenuStore, useCommonStore, useThemeStore };
// 4. 导出 Pinia 实例
export default pinia;
