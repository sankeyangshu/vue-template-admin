<template>
  <div class="role-table">
    <div class="header">
      <el-form :inline="true" :model="roleTableForm" ref="roleTableFormRef">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleTableForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onClickSearch">查询</el-button>
          <el-button icon="Refresh" @click="onClickResetForm(roleTableFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="footer-util">
        <el-button type="primary" icon="Plus" @click="onClickAddRole"> 新增角色 </el-button>
      </div>
      <!-- 表格 -->
      <div class="footer-table">
        <el-table
          v-loading="tableLoading"
          :data="tableState.tableData"
          border
          stripe
          style="width: 100%; height: 100%"
        >
          <el-table-column prop="roleName" label="角色名称" align="center" width="100" />
          <el-table-column
            prop="description"
            :show-overflow-tooltip="true"
            width="180"
            label="角色描述"
            align="center"
          />
          <el-table-column prop="roleType" label="角色标识" align="center" width="120" />
          <el-table-column prop="status" label="角色状态" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
                @change="onChangeStatus(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column prop="createtime" label="创建时间" align="center" width="180" />
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
      <div class="footer-pagination">
        <Pagination
          :pageable="tableState.pageable"
          :handle-size-change="handleSizeChange"
          :handle-current-change="handleCurrentChange"
        />
      </div>
    </div>
    <RoleDrawer ref="roleDrawer" />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { onMounted, provide, reactive, ref } from 'vue';
import { getMenuListAPI } from '@/api/System/menu';
import { deleteRoleAPI, postGetRoleListAPI } from '@/api/System/role';
import Pagination from '@/components/Pagination/Pagination.vue';
import { MENU_LIST } from '@/config/constant';
import { useTable } from '@/hooks/useTable';
import { menuListType } from '@/types/menu';
import { roleListResult, roleListType } from '@/types/role';
import RoleDrawer from './RoleDrawer.vue';

// 格式化表格数据
const handleTableData = (data: roleListResult) => {
  const { list } = data;
  for (const item of list) {
    item.createtime = dayjs(item.createtime).format('YYYY-MM-DD HH:mm:ss');
  }
  return data;
};

// 获取角色列表表格数据
const { getTableList, tableState, searchTable, resetTable, tableChangeCurrent, tableChangeSize } =
  useTable({
    api: postGetRoleListAPI,
    dataCallBack: handleTableData,
  });

// 全部菜单列表
const menuList = ref<menuListType[]>([]);

// 获取全部菜单信息
const getMenuList = async () => {
  try {
    const { data } = await getMenuListAPI();
    menuList.value = data;
  } catch (error) {
    console.log(error);
  }
};

// 依赖注入全部菜单列表
provide(MENU_LIST, menuList);

onMounted(async () => {
  await getTableList();
  await getMenuList();
});

// 查询条件
const roleTableForm = reactive({
  roleName: '',
});

// 查询表单节点
const roleTableFormRef = ref<FormInstance>();

// 表格是否加载
const tableLoading = ref(false);

// 查询
const onClickSearch = async () => {
  tableLoading.value = true;

  // 添加查询参数
  tableState.value.searchParam = roleTableForm;

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

// 新增/编辑角色
const roleDrawer = ref();

// 新增角色
const onClickAddRole = () => {
  roleDrawer.value.isShowDrawer();
};

// 修改角色状态
const onChangeStatus = (row: roleListType) => {
  ElMessageBox.confirm(
    `确定要${!row.status ? '禁用' : '启用'} ${row.roleName} 角色吗？`,
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      console.log(true);
    })
    .catch(() => {
      row.status = !row.status;
    });
};

// 编辑角色
const onClickEdit = (row: roleListType) => {
  roleDrawer.value.isShowDrawer(row);
};

// 删除角色
const onClickDel = (row: roleListType) => {
  ElMessageBox.confirm(`确定要删除角色 ${row.roleName} 吗?`, '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(async () => {
      await deleteRoleAPI({ id: row.id });
      // 更新表格
      await getTableList();
      ElMessage({
        message: '删除角色成功',
        type: 'success',
      });
    })
    .catch(() => {
      console.log('用户点击了取消');
    });
};

// 改变每页显示条目个数
const handleSizeChange = async (val: number) => {
  await tableChangeSize(val);
};

// 当前页数改变
const handleCurrentChange = async (val: number) => {
  await tableChangeCurrent(val);
};
</script>

<style lang="scss" scoped>
.role-table {
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
