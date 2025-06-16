import { defineStore } from 'pinia';

interface CommonState {
  flag: boolean;
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    flag: false
  }),
  getters: {
    currentFlag: (state) => state.flag
  },
  actions: {
    setAppLoading(flag: boolean) {
      this.flag = flag;
    }
  }
});
