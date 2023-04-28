<template>
  <div>
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd046"
        router
      >
        <SubMenu :menuList="menuList"></SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { filterRoutes, generateMenus } from '@/utils/routers';
import SubMenu from './components/SubMenu.vue';

// 获取路由实例
const router = useRouter();

// 筛选符合条件的路由
const menuList = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});

// 获取路由携带的参数和路径
const route = useRoute();

// 默认激活菜单
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped></style>
