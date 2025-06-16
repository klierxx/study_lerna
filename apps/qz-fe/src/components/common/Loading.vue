<template>
  <div class="loading-container" :style="containerStyle" v-if="visible">
    <div class="loading-wrapper">
      <div class="el-loading-spinner" :style="{ color: textColor }">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" :style="circleStyle" />
        </svg>
        <p v-if="showText" class="el-loading-text" :style="{ color: textColor }">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  // 定义组件属性
  const props = defineProps({
    // 是否显示
    visible: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩
    showMask: {
      type: Boolean,
      default: true
    },
    // 遮罩颜色
    maskColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.9)'
    },
    // 文字颜色
    textColor: {
      type: String,
      default: '#409EFF'
    },
    // 加载圆环颜色
    spinnerColor: {
      type: String,
      default: '#409EFF'
    },
    // 是否显示文字
    showText: {
      type: Boolean,
      default: true
    },
    // 加载文字
    text: {
      type: String,
      default: '加载中...'
    }
  });

  // 计算容器样式
  const containerStyle = computed(() => {
    return {
      backgroundColor: props.showMask ? props.maskColor : 'transparent'
    };
  });

  // 计算圆环样式
  const circleStyle = computed(() => {
    return {
      stroke: props.spinnerColor
    };
  });
</script>

<style scoped lang="scss">
  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-wrapper {
    text-align: center;
  }

  .el-loading-spinner {
    position: relative;

    .circular {
      width: 42px;
      height: 42px;
      animation: loading-rotate 2s linear infinite;
    }

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke-linecap: round;
    }

    .el-loading-text {
      margin: 3px 0;
      font-size: 14px;
    }
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
