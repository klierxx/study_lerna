import { defineStore } from 'pinia';
import { localCache } from '@/utils';

export const useSidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      collapse: true,
      bgColor: localCache.getCache('sidebar-bg-color') || '#fff',
      textColor: localCache.getCache('sidebar-text-color') || '#333'
    };
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    setBgColor(color: string) {
      this.bgColor = color;
      localCache.setCache('sidebar-bg-color', color);
    },
    setTextColor(color: string) {
      this.textColor = color;
      localCache.setCache('sidebar-text-color', color);
    }
  }
});
