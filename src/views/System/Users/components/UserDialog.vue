<template>
  <el-dialog v-model="userDialog" :title="dialogTitle" width="50%">
    <el-form ref="userDialogFormRef" :model="userDialogForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userDialogForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userDialogForm.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userDialogForm.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关联角色" prop="role">
        <el-select v-model="userDialogForm.role" placeholder="请选择角色" style="width: 100%">
          <el-option label="超级管理员" value="超级管理员" :key="0"></el-option>
          <el-option label="管理员" value="管理员" :key="1"></el-option>
          <el-option label="普通用户" value="普通用户" :key="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="photo">
        <el-input v-model="userDialogForm.photo" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="手机号" prop="photo">
        <el-input v-model="userDialogForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="userDialogForm.password"
          placeholder="请输入密码"
          type="password"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-switch
          v-model="userDialogForm.status"
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
        ></el-switch>
      </el-form-item>
      <el-form-item label="用户描述" prop="describe">
        <el-input v-model="userDialogForm.describe" type="textarea" placeholder="请输入用户描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

// 是否显示dialog
const userDialog = ref(false);

// dialog标题
const dialogTitle = ref('新增用户');

// 显示dialog，新增/编辑用户
const isShowDialog = () => {
  userDialog.value = true;
};

// 向父组件暴露该方法
defineExpose({ isShowDialog });

// 新增/编辑用户表单
const userDialogForm = reactive({
  username: '',
  nickname: '',
  sex: '男',
  role: '',
  photo: '',
  email: '',
  password: '',
  describe: '',
  status: true,
});
</script>

<style lang="scss" scoped></style>
