import { defineStore } from 'pinia';

interface LoginState {
  flag: boolean;
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
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
