<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-header">
        <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
        <div class="login-title">后台管理系统</div>
      </div>
      <el-form :model="param" :rules="rules" ref="login" size="large">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter="submitForm(login)">
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- <div class="pwd-tips">
          <el-checkbox class="pwd-checkbox" v-model="checked" label="记住密码" />
          <el-link type="primary" @click="$router.push('/reset-pwd')">忘记密码</el-link>
        </div> -->
        <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">登录</el-button>
        <!-- <p class="login-text">
          没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
        </p> -->
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { LOGIN_TOKEN } from '@/global/constants';
  import { localCache } from '@/utils';
  import router from '@/router';
  import { useMenuStore } from '@/stores/layout/menu';
  import type { Account } from '@/types/login';

  const menuStore = useMenuStore();

  const param = reactive<Account>({
    username: '',
    password: ''
  });

  const rules: FormRules = {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  };
  const login = ref<FormInstance>();
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
      if (valid) {
        ElMessage.success('登录成功');
        localCache.setCache('vuems_name', param.username);
        localCache.setCache(LOGIN_TOKEN, 'test-token-123456');
        await menuStore.setSystemMenus();
        router.push('/');
      } else {
        ElMessage.error('登录失败');
      }
    });
  };
</script>

<style scoped lang="scss">
  .login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    /* background: url(../../assets/img/login-bg.jpg) center/cover no-repeat; */
    .login-container {
      width: 450px;
      border-radius: 5px;
      background: #fff;
      padding: 40px 50px 50px;
      box-sizing: border-box;

      .login-header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;

        .logo {
          width: 35px;
        }

        .login-title {
          font-size: 22px;
          color: #333;
          font-weight: bold;
        }
      }
      .pwd-tips {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin: -10px 0 10px;
        color: #787878;
      }

      .pwd-checkbox {
        height: auto;
      }

      .login-btn {
        display: block;
        width: 100%;
      }

      .login-tips {
        font-size: 12px;
        color: #999;
      }

      .login-text {
        display: flex;
        align-items: center;
        margin-top: 20px;
        font-size: 14px;
        color: #787878;
      }
    }
  }
</style>
