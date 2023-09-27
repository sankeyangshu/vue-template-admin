<template>
  <el-dialog v-model="menuDialog" :title="dialogTitle" width="50%" @close="onCloseDialog">
    <el-form ref="menuDialogFormRef" :model="menuDialogForm" label-width="100px">
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="menuDialogForm.authType">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="3">权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="节点名称"
        prop="title"
        required
        :rules="[
          {
            required: true,
            message: '请输入节点名称',
            trigger: 'blur',
          },
          { max: 50, message: '节点名长度不能大于50位', trigger: 'blur' },
        ]"
      >
        <el-input v-model="menuDialogForm.title" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item
        label="节点标识"
        prop="signName"
        required
        :rules="[{ required: true, message: '请输入节点标识', trigger: 'blur' }]"
      >
        <el-input v-model="menuDialogForm.signName" placeholder="请输入节点标识" />
      </el-form-item>
      <el-form-item
        label="上级节点"
        prop="pid"
        required
        :rules="[{ required: true, message: '请选择上级节点', trigger: 'change' }]"
      >
        <el-tree-select
          v-model="menuDialogForm.pid"
          :data="menuPermList"
          check-strictly
          :render-after-expand="false"
          clearable
        />
      </el-form-item>

      <template v-if="menuDialogForm.authType === 1">
        <el-form-item
          label="节点路由"
          prop="url"
          required
          :rules="[{ required: true, message: '请输入节点路由', trigger: 'blur' }]"
        >
          <el-input v-model="menuDialogForm.url" placeholder="请输入节点路由" />
        </el-form-item>
        <el-form-item label="节点图标" prop="icon">
          <el-input v-model="menuDialogForm.icon" placeholder="请选择节点图标" />
        </el-form-item>
      </template>

      <el-form-item label="排序值" prop="sort">
        <el-input v-model="menuDialogForm.sort" placeholder="请输入排序值" />
      </el-form-item>
      <el-form-item label="节点状态">
        <el-switch
          v-model="menuDialogForm.status"
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="menuDialog = false">取消</el-button>
        <el-button type="primary" @click="onClickConfirm(menuDialogFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import type { PropType } from 'vue';
import { reactive, ref, watch } from 'vue';
import { postAddMenuAPI } from '@/api/System/menu';
import { menuListType, menuType } from '@/types/menu';

/**
 * 菜单权限节点类型
 */
interface menuPermType {
  value: string;
  label: string;
  children?: menuPermType[];
}

// 获取全部菜单权限节点
const props = defineProps({
  modelValue: {
    type: Array as PropType<menuListType[]>,
    default: () => [],
  },
});

/**
 * 处理菜单权限节点列表
 */
const handleMenuPermList = (list: menuListType[]) => {
  const menuPermList: menuPermType[] = [];

  for (let i = 0; i < list.length; i++) {
    menuPermList.push({
      value: list[i].id.toString(),
      label: list[i].title,
    });
    const children = list[i].children;
    if (children) {
      menuPermList[i].children = handleMenuPermList(children);
    }
  }

  return menuPermList;
};

// 全部菜单节点
const menuPermList = ref<menuPermType[]>([]);

// 监听菜单数据
watch(
  () => props.modelValue,
  () => {
    menuPermList.value = [
      {
        value: '0',
        label: '顶级菜单',
        children: handleMenuPermList(props.modelValue),
      },
    ];
  }
);

// 是否显示dialog
const menuDialog = ref(false);

// dialog标题
const dialogTitle = ref('');

// 显示dialog，新增/编辑菜单
const isShowDialog = (item: menuListType) => {
  dialogTitle.value = '新增菜单';
  if (item) {
    dialogTitle.value = '编辑菜单';
  }
  menuDialog.value = true;
};

// 向父组件暴露该方法
defineExpose({ isShowDialog });

// 表单节点
const menuDialogFormRef = ref<FormInstance>();

// dialog关闭事件
const onCloseDialog = () => {
  menuDialogFormRef.value?.resetFields();
};

// 新增/编辑菜单
const menuDialogForm = reactive<menuType>({
  authType: 1, // 资源类型-1是菜单,2是api接口,3是权限字段
  title: '', // 资源名称
  signName: '', // 资源标识
  pid: '', // 上级菜单id
  url: '', // 资源路由
  icon: '', // 资源图标
  sort: 10, // 排序
  status: true, // 资源状态
});

// 新增/编辑菜单后更新表格
const emits = defineEmits(['updateModelValue']);

// 处理新增/编辑菜单数据
const handleAddMenuPerm = (row: menuType) => {
  let obj: menuType = { ...row };
  obj.authType = Number(row.authType);
  obj.pid = row.pid && row.pid === '0' ? null : Number(row.pid);
  return obj;
};

// 新增/编辑菜单表单验证
const onClickConfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    try {
      // 新增菜单
      await postAddMenuAPI(handleAddMenuPerm(menuDialogForm));
      // 更新表格
      emits('updateModelValue');
      ElMessage({
        message: `${dialogTitle.value}成功`,
        type: 'success',
      });
    } finally {
      menuDialog.value = false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
