<template>
  <div class="wrapper">
    <div class="content-box" v-if="isLoading">
      <loading :visible="isLoading" />
    </div>
    <div class="content-box" v-else>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useMenuStore } from '@/stores/layout/menu';
  import { computed } from 'vue';

  const menuStore = useMenuStore();
  const isLoading = computed(() => menuStore.getSystemLoading);
</script>

<style scoped lang="scss">
  .wrapper {
    height: 100vh;
    overflow: hidden;

    .content-box {
      -webkit-transition: left 0.3s ease-in-out;
      transition: left 0.3s ease-in-out;
      background: #fff;
      height: 100vh;
      overflow: hidden;

      .content {
        width: auto;
        height: 100%;
        padding: 20px;
        overflow-y: scroll;
        box-sizing: border-box;
      }

      .content::-webkit-scrollbar {
        width: 0;
      }
    }
  }
</style>
