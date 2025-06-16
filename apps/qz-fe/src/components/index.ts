import type { App } from 'vue';

// 自动导入common目录下所有.vue文件
const modules = import.meta.glob('./common/*.vue', { eager: true });

export function registerGlobalComponents(app: App) {
  Object.entries(modules).forEach(([path, mod]: any) => {
    // 获取组件配置
    const component = mod.default || mod;
    // 获取文件名作为组件名（去掉前缀和后缀）
    const match = path.match(/\.\/common\/(.*)\.vue$/);
    if (match) {
      // 文件名转为大驼峰（如cus-input => CusInput）
      const fileName = match[1];
      const componentName = fileName
        .split('-')
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join('');
      app.component(componentName, component);
    }
  });
}
