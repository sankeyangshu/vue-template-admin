<template>
  <div class="deptManage">
    <DeptTable />
  </div>
</template>

<script lang="ts" setup>
import DeptTable from './components/DeptTable.vue';
</script>

<style lang="scss" scoped>
.deptManage {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>
