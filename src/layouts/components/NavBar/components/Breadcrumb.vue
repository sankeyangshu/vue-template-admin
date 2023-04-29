<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        :to="{ path: '/' }"
        key="home"
        v-if="breadcrumbData[0].meta.title !== '首页'"
      >
        <span class="redirect">首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <!-- 不可点击的面包屑 -->
        <span
          v-if="item.redirect === 'noRedirect' || index === breadcrumbData.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <!-- 可点击的面包屑 -->
        <span v-else class="redirect" @click="onClickHandleLink(item)">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();
const route = useRoute();

/**
 * @description: 点击面包屑跳转路由
 * @param {RouteRecordRaw} item 路由信息
 */
const onClickHandleLink = (item: RouteRecordRaw) => {
  router.push({
    path: item.path,
  });
};

/**
 * 面包屑数组数据
 */
const breadcrumbData = computed(() =>
  route.matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
);
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }

  .redirect:hover {
    color: $sub-menu-bg;
  }

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
