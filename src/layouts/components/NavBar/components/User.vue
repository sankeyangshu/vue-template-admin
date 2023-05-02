<template>
  <el-dropdown class="user" trigger="click">
    <div class="avatar-dropdown">
      <el-avatar
        shape="square"
        :size="36"
        class="avatar"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="user-name">{{ $t('navBar.user') }}</div>
      <el-icon class="up-down">
        <ArrowDown />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon> <Edit /> </el-icon>
          <span>{{ $t('navBar.changePassword') }}</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <el-icon> <SwitchButton /> </el-icon>
          <span>{{ $t('navBar.logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup></script>

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
