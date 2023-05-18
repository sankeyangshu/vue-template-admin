<template>
  <el-dropdown class="user" trigger="click">
    <div class="avatar-dropdown">
      <el-avatar
        shape="square"
        :size="36"
        class="avatar"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="user-name">{{ userInfo.username }}</div>
      <el-icon class="up-down header-icon">
        <ArrowDown />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon> <Edit /> </el-icon>
          <span>{{ $t('navBar.changePassword') }}</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="onClickLogout">
          <el-icon> <SwitchButton /> </el-icon>
          <span>{{ $t('navBar.logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { userInfoType } from '@/types/user';

// store
const userStore = useUserStore();

// 获取用户信息
const userInfo = computed(() => userStore.userInfo as userInfoType);

// 用户退出登录
const onClickLogout = () => {
  userStore.logout(true);
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  //color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.user {
  cursor: pointer;
  .avatar-dropdown {
    height: 50px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar {
      margin-right: 6px;
    }
    .user-name {
      position: relative;
      margin: 0 6px;
    }
  }
}
</style>
