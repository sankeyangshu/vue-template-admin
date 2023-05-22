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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
