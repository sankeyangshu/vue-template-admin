<template>
  <el-dialog v-model="userDialog" :title="dialogTitle" width="50%">
    <el-form
      ref="userDialogFormRef"
      :model="userDialogForm"
      :rules="userDialogRules"
      label-width="100px"
    >
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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userDialogForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userDialogForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
      <el-form-item label="用户描述">
        <el-input
          v-model="userDialogForm.description"
          type="textarea"
          placeholder="请输入用户描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userDialog = false">取消</el-button>
        <el-button type="primary" @click="onClickConfirm(userDialogFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { validPhone, validEmail } from '@/utils/validate';

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

// 表单节点
const userDialogFormRef = ref<FormInstance>();

// 新增/编辑用户表单
const userDialogForm = reactive({
  username: '', // 用户名
  nickname: '', // 昵称
  sex: '男', // 性别
  role: '', // 角色
  phone: '', // 手机号
  email: '', // 邮箱
  password: '', // 密码
  description: '', // 用户描述
  status: true, // 用户状态
});

/**
 * @description: 手机号校验规则
 * @param {any} rule 校验规则
 * @param {string} value 手机号
 * @param {any} callback 回调函数
 * @return  是否通过校验
 */
const checkPhone = (rule: any, value: string, callback: any) => {
  if (!validPhone(value)) {
    // 返回一个错误提示
    callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
};

/**
 * @description: 邮箱校验规则
 * @param {any} rule 校验规则
 * @param {string} value 邮箱
 * @param {any} callback 回调函数
 * @return  是否通过校验
 */
const checkEmail = (rule: any, value: string, callback: any) => {
  if (!validEmail(value)) {
    // 返回一个错误提示
    callback(new Error('请输入正确的邮箱地址'));
  } else {
    callback();
  }
};

// 校验规则
const userDialogRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名长度不能小于4位', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 6, message: '昵称长度在 2 - 6 个字符', trigger: 'blur' },
  ],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 16, message: '密码长度不符合规范，密码长度 4 - 16 位', trigger: 'blur' },
  ],
});

// 新增/编辑用户
const onClickConfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
