<template>
  <div class="wrapper">
    <l-header />
    <div class="main" v-if="isLoading">
      <loading :visible="isLoading" />
    </div>
    <div class="main" v-else>
      <l-sidebar />
      <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
        <l-tabs></l-tabs>
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :include="tabs.nameList">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useSidebarStore } from '@/stores/layout/sidebar';
  import { useTabsStore } from '@/stores/layout/tabs';
  import { useMenuStore } from '@/stores/layout/menu';
  import LHeader from './components/LHeader.vue';
  import LSidebar from './components/LSidebar.vue';
  import LTabs from './components/LTabs.vue';
  import { computed } from 'vue';

  const sidebar = useSidebarStore();
  const tabs = useTabsStore();
  const menuStore = useMenuStore();
  const isLoading = computed(() => menuStore.getSystemLoading);
</script>

<style scoped lang="scss">
  .wrapper {
    height: 100vh;
    overflow: hidden;

    .main {
      position: relative;
      height: calc(100% - 90px);
      margin-top: 6px;

      .content-box {
        &.content-collapse {
          left: 65px;
        }

        position: absolute;
        left: 260px;
        right: 0;
        top: 0px;
        bottom: 0;
        padding-bottom: 30px;
        -webkit-transition: left 0.3s ease-in-out;
        transition: left 0.3s ease-in-out;
        background: #eef0fc;
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
  }
</style>
