<template>
  <div class="roleMenuTree">
    <el-scrollbar max-height="100%">
      <el-tree
        ref="roleMenuTreeRef"
        :data="menuList"
        :props="defaultMenuProps"
        show-checkbox
        node-key="id"
        @check-change="onCheckTreeChange"
      />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watchEffect } from 'vue';
import { ElTree } from 'element-plus';
import type { PropType, Ref } from 'vue';
import { menuListType } from '@/types/menu';
import { MENU_LIST } from '@/config/constant';

// 获取全部菜单列表
const menuList = inject<Ref<menuListType[]>>(MENU_LIST, ref([]));

// 菜单节点默认配置
const defaultMenuProps = {
  children: 'children',
  label: 'title',
};

// 菜单权限节点
const roleMenuTreeRef = ref<InstanceType<typeof ElTree>>();

// 获取用户菜单数据
const props = defineProps({
  menuData: {
    type: Array as PropType<Array<string | number>>,
    default: () => [],
  },
});

// 监听用户菜单数据-获取并设置用户菜单数据
watchEffect(() => {
  roleMenuTreeRef.value?.setCheckedKeys(props.menuData, true);
});

// 选中菜单
const emit = defineEmits(['updateMenuData']);

const onCheckTreeChange = () => {
  emit('updateMenuData', roleMenuTreeRef.value?.getCheckedKeys());
};
</script>

<style lang="scss" scoped>
.roleMenuTree {
  width: 100%;
  height: 500px;
  .el-scrollbar {
    border: var(--zb-border-light);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  }
}
</style>
