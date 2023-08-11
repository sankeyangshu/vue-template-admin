<template>
  <el-drawer v-model="drawerVisible" :title="drawerTitle" size="50%" @close="onCloseDrawer">
    <el-form ref="roleFormRef" :model="roleDrawerForm" :rules="roleDrawerRules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleDrawerForm.roleName" placeholder="请输入角色名称" />
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
import { reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { postAddRoleAPI } from '@/api/System/role';

// 是否显示drawer
const drawerVisible = ref(false);

// drawer标题
const drawerTitle = ref('');

const isShowDrawer = (item: object) => {
  drawerTitle.value = '新增用户';
  if (item) {
    drawerTitle.value = '编辑用户';
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
const roleDrawerForm = reactive({
  roleName: '', // 角色名称
  description: '', // 角色描述
  status: true, // 角色状态
});

// 校验规则
const roleDrawerRules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
});

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
