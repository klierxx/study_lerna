<template>
  <template v-if="currentSystemItem.layout === 'default'">
    <default-layout :key="layoutKey" />
  </template>
  <template v-else-if="currentSystemItem.layout === 'application'">
    <application-layout :key="layoutKey" />
  </template>
  <template v-else-if="currentSystemItem.layout === 'container'">
    <other-layout :key="layoutKey" />
  </template>
  <template v-else-if="currentSystemItem.layout === 'micro'">
    <div id="main-pub-container" class="qiankun-container" :key="layoutKey"></div>
  </template>
  <template v-else>
    <!-- 默认情况使用 default 布局 -->
    <default-layout :key="layoutKey" />
  </template>
</template>

<script setup lang="ts">
  import { registerMicroApps, start } from 'qiankun';
  import { onMounted, watch, computed, ref } from 'vue';
  import { useMenuStore } from '@/stores/layout/menu';
  import DefaultLayout from './default.vue';
  import ApplicationLayout from './application.vue';
  import OtherLayout from './otherLayout.vue';
  const menuStore = useMenuStore();
  // 已注册的微前端应用
  let microAppsRegistered = false;
  const registerMicro = () => {
    if (microAppsRegistered) return;
    registerMicroApps([
      {
        name: 'micro',
        entry: '//localhost:8899/',
        container: '#main-pub-container',
        activeRule: 'micro/'
      }
    ]);
    start();
    microAppsRegistered = true;
  };
  const currentSystemItem = computed(() => menuStore.getCurrentSystemItem);
  // 创建一个响应式的layoutKey，用于强制布局组件重新渲染
  const layoutKey = ref(Date.now());

  // 监听 currentSystemItem 的变化
  watch(
    () => currentSystemItem.value.layout,
    (newType, oldType) => {
      if (newType === 'micro') {
        registerMicro();
        return;
      }
      // 如果布局类型变化，更新layoutKey强制重新渲染
      if (newType !== oldType) {
        layoutKey.value = Date.now();
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    if (currentSystemItem.value.layout === 'micro') {
      registerMicro();
    }
  });
</script>
