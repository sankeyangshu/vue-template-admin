<template>
  <div class="menu-table">
    <div class="header">
      <el-form :inline="true" :model="menuTableForm" ref="menuTableFormRef">
        <el-form-item label="菜单名" prop="menuName">
          <el-input v-model="menuTableForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onClickSearch">查询</el-button>
          <el-button icon="Refresh" @click="onClickResetForm(menuTableFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="footer-util">
        <el-button type="primary" icon="Plus" @click="onClickAddMenu"> 新增菜单 </el-button>
      </div>
      <!-- 表格 -->
      <div class="footer-table">
        <el-table
          v-loading="tableLoading"
          :data="tableState.tableData"
          border
          stripe
          style="width: 100%; height: 100%"
          row-key="id"
        >
          <el-table-column prop="title" label="菜单名称" />
          <el-table-column prop="authType" label="菜单类型" />
          <el-table-column prop="url" label="菜单路由" />
          <el-table-column prop="signName" label="菜单标识" />
          <el-table-column prop="status" label="操作">
            <template #default="scope">
              <el-button type="primary" size="small" icon="Edit" @click="onClickEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="small" icon="Delete" @click="onClickDel(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="footer-pagination"></div>
    </div>
    <MenuDialog ref="menuDialog" v-model="tableState.tableData" />
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getMenuListAPI } from '@/api/System/menu';
import { menuListType } from '@/types/menu';
import { useTable } from '@/hooks/useTable';
import MenuDialog from './MenuDialog.vue';

// 格式化表格数据
const handleTableData = (data: menuListType[]) => {
  for (const item of data) {
    const authType = Number(item.authType);
    if (authType === 1) {
      item.authType = '菜单';
    } else if (authType === 2) {
      item.authType = '接口';
    } else if (authType === 3) {
      item.authType = '权限';
    }

    if (item.children) {
      handleTableData(item.children);
    }
  }
  return data;
};

// 获取菜单列表数据
const { getTableList, tableState } = useTable({
  api: getMenuListAPI,
  dataCallBack: handleTableData,
  isPageable: false,
});

onMounted(async () => {
  await getTableList();
});

// 查询条件
const menuTableForm = reactive({
  menuName: '',
});

// 查询表单节点
const menuTableFormRef = ref<FormInstance>();

// 表格是否加载
const tableLoading = ref(false);

// 查询
const onClickSearch = () => {
  tableLoading.value = true;
  setTimeout(() => {
    tableLoading.value = false;
  }, 500);
};

// 重置
const onClickResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 新增/编辑菜单 dialog 节点
const menuDialog = ref();

// 新增菜单
const onClickAddMenu = () => {
  menuDialog.value.isShowDialog();
};

// 编辑菜单
const onClickEdit = (row: any) => {
  console.log(row);
};

// 删除菜单
const onClickDel = (row: any) => {
  console.log(row);
};
</script>

<style lang="scss" scoped>
.menu-table {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  .header {
    display: flex;
    padding: 16px 16px 0;
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
  }
  .footer {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 16px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    .footer-util {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
      margin-bottom: 15px;
    }
    .footer-table {
      position: relative;
      flex: 1;
    }
    .footer-pagination {
      box-sizing: border-box;
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
      width: 100%;
      padding-top: 20px;
    }
  }
}
</style>
