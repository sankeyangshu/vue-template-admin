<template>
  <div class="login-container">
    <!-- 暗黑模式切换 开始 -->
    <SwitchDark></SwitchDark>
    <!-- 暗黑模式切换 结束 -->

    <!-- 登录 -->
    <div class="login-box">
      <div class="login-welcome">
        <img src="../../assets/images/welcome.png" alt="welcome" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="logo-icon" src="../../assets/images/logo.png" alt="logo" />
          <span class="logo-text">Vue-Admin</span>
        </div>
        <!-- 登录功能 开始 -->
        <el-form ref="ruleFormRef" :model="loginForm">
          <!-- 用户名 开始 -->
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              autoComplete="on"
              style="position: relative"
              v-model="loginForm.username"
              type="text"
            >
              <template #prefix>
                <svg-icon icon="user" />
              </template>
            </el-input>
          </el-form-item>
          <!-- 用户名 结束 -->

          <!-- 密码 开始 -->
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              autoComplete="on"
              v-model="loginForm.password"
              show-password
            >
              <template #prefix>
                <svg-icon icon="password" />
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 结束 -->

          <el-button
            type="primary"
            style="width: 100%; height: 47px; margin-top: 20px"
            @click="onClickSubmit"
          >
            登录
          </el-button>
        </el-form>
        <!-- 登录功能 结束 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { postLoginAPI } from '@/api/user';
import SwitchDark from '@/components/SwitchDark/index.vue';

// 用户账户密码
const loginForm = reactive({
  username: '', // 用户名
  password: '', // 密码
});

const onClickSubmit = async () => {
  await postLoginAPI(loginForm);
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/images/login_bg.svg');
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .dark {
    position: absolute;
    top: 5%;
    right: 3.2%;
  }
  .login-box {
    width: 96%;
    height: 94%;
    padding: 0 4% 0 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-sizing: border-box;
    .login-welcome {
      width: 750px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      padding: 40px 45px 25px;
      border-radius: 10px;
      .login-logo {
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo-icon {
          width: 70px;
        }
        .logo-text {
          padding-left: 25px;
          font-size: 48px;
          font-weight: bold;
          white-space: nowrap;
        }
      }
      :deep(.el-form-item) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }
      :deep(input) {
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        caret-color: #ffffff;
        box-shadow: none;
      }
    }
  }
}
</style>
