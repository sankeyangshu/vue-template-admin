<template>
  <div>
    <el-scrollbar>
      <el-menu
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd046"
        :unique-opened="true"
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
