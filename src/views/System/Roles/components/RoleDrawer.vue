<template>
  <el-drawer v-model="drawerVisible" :title="drawerTitle" size="50%" @close="onCloseDrawer">
    <el-form ref="roleFormRef" :model="roleDrawerForm" :rules="roleDrawerRules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName" required>
        <el-input v-model="roleDrawerForm.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色标识" prop="roleType" required>
        <el-input v-model="roleDrawerForm.roleType" placeholder="请输入角色标识，标识唯一" />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch
          v-model="roleDrawerForm.status"
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
        ></el-switch>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="roleDrawerForm.description"
          type="textarea"
          placeholder="请输入角色描述"
        />
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input v-model="roleDrawerForm.sort" placeholder="请输入排序值" />
      </el-form-item>
      <el-form-item label="菜单权限">
        <RoleMenuTree v-model:menuData="menuData" @update-menu-data="onUpdateMenuData" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="onClickConfirm(roleFormRef)">确定</el-button>
      </span>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { getRoleMenuAPI, postAddRoleAPI } from '@/api/System/role';
import { menuListType } from '@/types/menu';
import { roleType as roleParamsType } from '@/types/role';
import RoleMenuTree from './RoleMenuTree.vue';

// 用户菜单列表
const menuData = ref<number[]>([]);

/**
 * @description: 格式化用户菜单列表id
 * @param {*} list 菜单列表
 * @return 列表id
 */
const handleUserMenuData = (list: menuListType[]) => {
  const menuIds: number[] = [];

  for (let i = 0; i < list.length; i++) {
    const children = list[i].children;
    if (children) {
      handleUserMenuData(children);
    }
    menuIds.push(list[i].id);
  }

  return menuIds;
};

// 获取用户菜单列表
const getUserRoleMenuData = async (roleID: number) => {
  const { data } = await getRoleMenuAPI({ roleID });
  menuData.value = handleUserMenuData(data);
};

// 是否显示drawer
const drawerVisible = ref(false);

// drawer标题
const drawerTitle = ref('');

const isShowDrawer = async (item: any) => {
  // 重置菜单列表
  menuData.value = [];

  drawerTitle.value = '新增角色';
  if (item) {
    drawerTitle.value = '编辑角色';
    item.id && (await getUserRoleMenuData(item.id));
  }
  drawerVisible.value = true;
};

// 向父组件暴露该方法
defineExpose({ isShowDrawer });

// 表单节点
const roleFormRef = ref<FormInstance>();

// drawer关闭事件
const onCloseDrawer = () => {
  // 重置表单
  roleFormRef.value?.resetFields();
};

// 新增/编辑角色
const roleDrawerForm = reactive<roleParamsType>({
  roleName: '', // 角色名称
  roleType: '', // 角色标识
  description: '', // 角色描述
  status: true, // 角色状态
  sort: 10, // 排序值
  resourceIds: [], // 资源权限id
});

// 校验规则
const roleDrawerRules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleType: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
});

// 角色菜单权限
const onUpdateMenuData = (data: number[]) => {
  roleDrawerForm.resourceIds = data;
};

// 新增/编辑角色
const onClickConfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    try {
      // 新增角色
      await postAddRoleAPI(roleDrawerForm);
      ElMessage({ message: `${drawerTitle.value}成功`, type: 'success' });
    } finally {
      drawerVisible.value = false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
