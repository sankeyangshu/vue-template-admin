<template>
  <div>
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd046"
      >
        <SubMenu></SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SubMenu from './components/SubMenu/SubMenu.vue';
</script>

<style lang="scss" scoped></style>
