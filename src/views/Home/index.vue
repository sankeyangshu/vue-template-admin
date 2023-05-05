<template>
  <div class="home">
    <el-card shadow="hover">
      <div class="page-header">
        <el-avatar :size="60" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="page-header-tip">
          <p class="page-header-tip-title">
            {{ `${getTimeStateStr()} ${userInfo.username}，${welcome()}` }}
          </p>
          <p class="page-header-tip-desc">Vue-Admin后台管理系统</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { userInfoType } from '@/types/user';
import { getTimeStateStr, welcome } from '@/utils';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

// 用户信息
const userInfo = computed(() => userStore.userInfo as userInfoType);
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  .page-header {
    display: flex;
    align-items: center;
    .page-header-tip {
      flex: 1;
      margin-left: 20px;
    }
    .page-header-tip-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: 700;
      color: #3c4a54;
    }
    .page-header-tip-desc {
      min-height: 20px;
      font-size: 14px;
      color: #808695;
    }
  }
}
</style>
