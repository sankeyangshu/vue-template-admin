<template>
  <div class="login-container">
    <!--登录功能-->
    <el-form ref="ruleFormRef" :model="loginForm" class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <!-- 用户名 开始 -->
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          autoComplete="on"
          style="position: relative"
          v-model="loginForm.userName"
          type="text"
        >
          <template #prefix>
            <!-- <el-icon><User /></el-icon> -->
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
            <!-- <el-icon><Lock /></el-icon> -->
            <svg-icon icon="password" />
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 结束 -->

      <el-button type="primary" style="width: 100%; height: 47px; margin-top: 20px">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// 用户账户密码
const loginForm = reactive({
  userName: '', // 用户名
  password: '', // 密码
});
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-size: cover;
  background-color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 80%;
    max-width: 500px;
    height: 370px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    :deep(input) {
      background: transparent;
      -webkit-appearance: none;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      box-shadow: none;
    }
    :deep(.el-input__wrapper) {
      background: none;
      box-shadow: none;
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
