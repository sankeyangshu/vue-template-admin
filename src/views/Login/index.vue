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
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <!-- 用户名 开始 -->
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              autocomplete="on"
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
              autocomplete="on"
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
            :loading="loading"
            @click="onClickSubmit(loginFormRef)"
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { getTimeStateStr } from '@/utils';
import { useUserStore } from '@/store/modules/user';
import SwitchDark from '@/components/SwitchDark/index.vue';

// 表单校验
const loginFormRef = ref<FormInstance>();

/**
 * @description: 登录用户名校验规则
 * @param {any} rule 校验规则
 * @param {string} value 用户名
 * @param {any} callback 回调函数
 * @return  是否通过校验
 */
const validateUsername = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'));
  } else {
    callback();
  }
};

/**
 * @description: 登录密码校验规则
 * @param {any} rule 校验规则
 * @param {string} value 密码
 * @param {any} callback 回调函数
 * @return  是否通过校验
 */
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length < 4 || value.length > 16) {
    callback(new Error('密码长度不符合规范，密码长度4-16位'));
  } else {
    callback();
  }
};

// 校验规则
const loginRules = reactive<FormRules>({
  username: [
    {
      required: true,
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
    },
  ],
});

// 用户账户密码
const loginForm = reactive({
  username: '', // 用户名
  password: '', // 密码
});

// 按钮加载状态
const loading = ref(false);

// 路由
const router = useRouter();

// sotre
const userStore = useUserStore();

// 用户登录
const onClickSubmit = (formEl: FormInstance | undefined) => {
  // 进行表单校验
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    try {
      loading.value = true; // 按钮进入加载状态
      // 通过验证
      await userStore.login(loginForm);
      router.push({ path: '/' }); // 跳转到首页
      ElNotification({
        title: `hi,${getTimeStateStr()}!`,
        message: `欢迎回来`,
        type: 'success',
        duration: 3000,
      });
    } finally {
      loading.value = false; // 关闭按钮加载状态
    }
  });
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
        box-shadow: none;
      }
    }
  }
}
</style>
