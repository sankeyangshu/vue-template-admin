<template>
  <div class="nav-bar-right">
    <!-- 搜索 -->
    <HeaderSearch />
    <!-- 全屏 -->
    <ScreenFull />
    <!-- 切换组件尺寸 -->
    <ComponentSize />
    <!-- 国际化 -->
    <LangSelect />
    <!-- 通知 -->
    <Notice />
    <!-- 设置 -->
    <Setting />
    <!-- 用户信息 -->
    <User />
  </div>
</template>

<script lang="ts" setup>
import ComponentSize from './components/ComponentSize.vue';
import HeaderSearch from './components/HeaderSearch.vue';
import LangSelect from './components/LangSelect.vue';
import Notice from './components/Notice.vue';
import ScreenFull from './components/ScreenFull.vue';
import Setting from './components/Setting.vue';
import User from './components/User.vue';
</script>

<style lang="scss" scoped>
.nav-bar-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
}
</style>
