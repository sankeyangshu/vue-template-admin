<template>
  <el-popover placement="bottom" :width="310" trigger="click">
    <template #reference>
      <div class="message">
        <el-tooltip effect="dark" :content="$t('navBar.notice')" placement="bottom">
          <el-badge :value="5" class="item">
            <el-icon size="22px" class="header-icon"><Bell /></el-icon>
          </el-badge>
        </el-tooltip>
      </div>
    </template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知(5)" name="first">
        <div class="message-list">
          <div class="message-item">
            <img src="@/assets/images/logo.png" alt="" class="message-img" />
            <div class="message-content">
              <span class="message-title">这是一个通知！！！</span>
              <span class="message-date">一分钟前</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息(0)" name="second">
        <div class="message-empty">
          <img src="@/assets/images/noMessage.png" alt="notData" class="message-noImg" />
          <div>暂无消息</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="代办(0)" name="third">
        <div class="message-empty">
          <img src="@/assets/images/noMessage.png" alt="notData" class="message-noImg" />
          <div>暂无代办</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeName = ref('first');
</script>

<style lang="scss" scoped>
.message {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.message-list {
  display: flex;
  flex-direction: column;
  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .message-img {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .message-content {
      display: flex;
      flex-direction: column;
      .message-title {
        margin-bottom: 5px;
      }
      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
  .message-noImg {
    width: 120px;
    height: 100px;
  }
}
</style>
