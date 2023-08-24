<template>
  <div class="menu-table">
    <div class="header">
      <el-form :inline="true" :model="menuTableForm" ref="menuTableFormRef">
        <el-form-item label="菜单名" prop="menuName">
          <el-input v-model="menuTableForm.title" placeholder="请输入菜单名称" />
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
          <el-table-column prop="title" label="名称" align="center" />
          <el-table-column prop="authType" label="类型" width="100" align="center" />
          <el-table-column prop="icon" label="图标" width="100" align="center" />
          <el-table-column prop="url" label="节点路由" align="center" />
          <el-table-column prop="signName" label="标识" width="100" align="center" />
          <el-table-column prop="status" label="节点状态" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
              />
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="100" align="center" />
          <el-table-column prop="updatetime" label="更新时间" width="180" align="center" />
          <el-table-column prop="operator" label="操作" width="200px" align="center" fixed="right">
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
    <MenuDialog
      ref="menuDialog"
      v-model="tableState.tableData"
      @updateModelValue="updateTableList"
    />
  </div>
</template>

<script lang="ts" setup>
import { type FormInstance, ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getMenuListAPI, deleteMenuAPI } from '@/api/System/menu';
import { menuListType } from '@/types/menu';
import { useTable } from '@/hooks/useTable';
import MenuDialog from './MenuDialog.vue';
import dayjs from 'dayjs';

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
    item.updatetime = dayjs(item.updatetime).format('YYYY-MM-DD HH:mm:ss');
    if (item.children) {
      handleTableData(item.children);
    }
  }
  return data;
};

// 获取菜单列表数据
const { getTableList, tableState, searchTable, resetTable } = useTable({
  api: getMenuListAPI,
  dataCallBack: handleTableData,
  isPageable: false,
});

onMounted(async () => {
  await getTableList();
});

// 查询条件
const menuTableForm = reactive({
  title: '',
});

// 查询表单节点
const menuTableFormRef = ref<FormInstance>();

// 表格是否加载
const tableLoading = ref(false);

// 查询
const onClickSearch = async () => {
  tableLoading.value = true;

  // 添加查询参数
  tableState.value.searchParam = menuTableForm;

  // 查询表格
  await searchTable();
  tableLoading.value = false;
};

// 重置
const onClickResetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await resetTable();
  formEl.resetFields();
};

// 新增/编辑菜单 dialog 节点
const menuDialog = ref();

// 新增菜单
const onClickAddMenu = () => {
  menuDialog.value.isShowDialog();
};

// 编辑菜单
const onClickEdit = (row: menuListType) => {
  menuDialog.value.isShowDialog(row);
};

// 删除菜单
const onClickDel = (row: menuListType) => {
  // 判断菜单是否有子菜单，有子菜单无法删除
  if (row.children) {
    ElMessage({
      message: '该菜单下还有子菜单,无法删除',
      type: 'warning',
    });
    return;
  }

  ElMessageBox.confirm(`你确定要删除${row.authType} ${row.title} 吗?`, '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(async () => {
      let authType = 1;
      if (row.authType === '菜单') {
        authType = 1;
      } else if (row.authType === '接口') {
        authType = 2;
      } else if (row.authType === '权限') {
        authType = 3;
      }

      // 删除
      await deleteMenuAPI({ id: row.id, authType });
      // 更新表格
      await getTableList();
      ElMessage({
        message: `删除${row.authType}成功`,
        type: 'success',
      });
    })
    .catch(() => {
      console.log('用户点击了取消');
    });
};

// 更新表格
const updateTableList = async () => {
  await getTableList();
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
