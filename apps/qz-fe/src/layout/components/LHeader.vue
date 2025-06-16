<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left">
      <!-- <img class="logo" src="../assets/img/logo.svg" alt="" /> -->
      <div class="web-title">租户管理系统</div>
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="sidebar.collapse">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="header-center">
      <l-system />
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="header-input">
          <cus-input
            class="header-search"
            placeholder="请输入搜索内容"
            :clearable="true"
            :size="'small'"
            :width="'300px'"
          />
        </div>
        <!-- 用户头像 -->
        <el-avatar class="user-avator" :size="30" :src="imgurl" />
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <a href="xxx" target="_blank">
                        <el-dropdown-item>项目仓库</el-dropdown-item>
                    </a>
                    <a href="xxx" target="_blank">
                        <el-dropdown-item>官方文档</el-dropdown-item>
                    </a> -->
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item command="admin">后台管理</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="LHeader">
  import { onMounted } from 'vue';
  import { useSidebarStore } from '@/stores/layout/sidebar';
  import { useRouter } from 'vue-router';
  import { localCache } from '@/utils';
  import { resetRouteStatus } from '@/permission';
  import imgurl from '@/assets/images/logo.svg';
  import LSystem from './LSystem.vue';
  import { switchSystemMenuAndRedirect } from '@/utils';
  import { useMenuStore } from '@/stores/layout/menu';
  import type { AppMenuItem } from '@/types/menu';
  const username: string | null = localCache.getCache('vuems_name') || 'admin';
  // const message: number = 2;

  const sidebar = useSidebarStore();
  const menuStore = useMenuStore();
  // 侧边栏折叠
  const collapseChage = () => {
    sidebar.handleCollapse();
  };

  onMounted(() => {
    if (document.body.clientWidth < 1200) {
      collapseChage();
    }
  });

  // 用户名下拉菜单选择事件
  const router = useRouter();
  const handleCommand = (command: string) => {
    if (command == 'loginout') {
      localCache.clear();
      resetRouteStatus();
      router.push('/login');
    } else if (command == 'user') {
      router.push('/ucenter');
    } else if (command == 'admin') {
      // 重置应用商店选中状态
      menuStore.resetSelectedApp();
      
      // 重置系统菜单选中状态（通过修改 currentSystemItem 为空对象）
      menuStore.currentSystemItem = {} as AppMenuItem;
      
      const adminApp = {
        id: 'admin',
        name: '后台管理',
        layout: 'default',
        appType: 'inside',
      };
      
      // 使用 switchSystemMenuAndRedirect 切换系统
      switchSystemMenuAndRedirect(adminApp, router);
    }
  };

  // const setFullScreen = () => {
  //   if (document.fullscreenElement) {
  //     document.exitFullscreen();
  //   } else {
  //     document.body.requestFullscreen.call(document.body);
  //   }
  // };
</script>
<style scoped lang="scss">
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 90px;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    box-shadow: 0px 4px 6px 0px #d2dce3;

    .header-left {
      float: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 40px;
      height: 100%;
      width: 260px;

      .logo {
        width: 35px;
      }

      .web-title {
        font-size: 22px;
      }

      .collapse-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        cursor: pointer;
        opacity: 0.8;
        font-size: 22px;
      }

      .collapse-btn {
        &:hover {
          opacity: 1;
        }
      }
    }

    .header-center {
      float: left;
      height: 100%;
    }

    .header-right {
      float: right;
      padding-right: 20px;
      height: 100%;

      .header-user-con {
        display: flex;
        height: 100%;
        align-items: center;

        .header-input {
          margin-right: 20px;
        }

        .btn-icon {
          position: relative;
          width: 30px;
          height: 30px;
          text-align: center;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: var(--header-text-color);
          margin: 0 5px;
          font-size: 20px;

          .btn-bell-badge {
            position: absolute;
            right: 4px;
            top: 0px;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #f56c6c;
            color: var(--header-text-color);
          }
        }

        .user-avator {
          margin: 0 10px 0 20px;
        }

        .user-name {
          .el-dropdown-link {
            color: var(--header-text-color);
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          // .el-dropdown-menu__item {
          //     text-align: center;
          // }
        }
      }
    }
  }
</style>
