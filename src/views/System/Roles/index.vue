<template>
  <div class="roleManage">
    <RoleTable />
  </div>
</template>

<script lang="ts" setup>
import RoleTable from './components/RoleTable.vue';
</script>

<style lang="scss" scoped>
.roleManage {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>
