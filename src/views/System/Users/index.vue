<template>
  <div class="userManage">
    <UserTable />
  </div>
</template>

<script lang="ts" setup>
import UserTable from './components/UserTable.vue';
</script>

<style lang="scss" scoped>
.userManage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
