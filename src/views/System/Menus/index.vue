<template>
  <div class="menuManage">
    <MenuTable />
  </div>
</template>

<script lang="ts" setup>
import MenuTable from './components/MenuTable.vue';
</script>

<style lang="scss" scoped>
.menuManage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
