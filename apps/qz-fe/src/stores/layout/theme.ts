import { mix, setProperty, localCache } from '@/utils';
import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      primary: '',
      success: '',
      warning: '',
      danger: '',
      info: '',
      headerBgColor: '#242f42',
      headerTextColor: '#fff'
    };
  },
  getters: {},
  actions: {
    initTheme() {
      ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
        const color = localCache.getCache(`theme-${type}`) || '';
        if (color) {
          this.setPropertyColor(color, type);
        }
      });
      const headerBgColor = localCache.getCache('header-bg-color');
      if (headerBgColor) {
        this.setHeaderBgColor(headerBgColor);
      }
      const headerTextColor = localCache.getCache('header-text-color');
      if (headerTextColor) {
        this.setHeaderTextColor(headerTextColor);
      }
    },
    resetTheme() {
      ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
        this.setPropertyColor('', type);
      });
    },
    setPropertyColor(color: string, type: string = 'primary') {
      this[type] = color;
      setProperty(`--el-color-${type}`, color);
      localCache.setCache(`theme-${type}`, color);
      this.setThemeLight(type);
    },
    setThemeLight(type: string = 'primary') {
      [3, 5, 7, 8, 9].forEach((v) => {
        setProperty(`--el-color-${type}-light-${v}`, mix('#ffffff', this[type], v / 10));
      });
      setProperty(`--el-color-${type}-dark-2`, mix('#ffffff', this[type], 0.2));
    },
    setHeaderBgColor(color: string) {
      this.headerBgColor = color;
      setProperty('--header-bg-color', color);
      localCache.setCache(`header-bg-color`, color);
    },
    setHeaderTextColor(color: string) {
      this.headerTextColor = color;
      setProperty('--header-text-color', color);
      localCache.setCache(`header-text-color`, color);
    }
  }
});
