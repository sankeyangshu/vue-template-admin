<template>
  <div class="user-table">
    <div class="header">
      <el-form :inline="true" :model="userTableForm" ref="userTableFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userTableForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onClickSearch">查询</el-button>
          <el-button icon="Refresh" @click="onClickResetForm(userTableFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="footer-util">
        <el-button type="primary" icon="Plus" @click="onClickAddUser"> 新增用户 </el-button>
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
          <el-table-column prop="username" label="用户名" align="center" width="100" />
          <el-table-column prop="nickname" label="昵称" align="center" />
          <el-table-column prop="sex" label="性别" align="center" />
          <el-table-column prop="userType" label="关联角色" align="center" width="120" />
          <el-table-column prop="phone" label="手机号" align="center" width="120" />
          <el-table-column prop="email" label="邮箱" align="center" width="120" />
          <el-table-column prop="status" label="用户状态" align="center">
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
          <el-table-column
            prop="description"
            :show-overflow-tooltip="true"
            width="180"
            label="用户描述"
            align="center"
          />
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
    <UserDialog ref="userDialog" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { postGetUserListAPI, deleteUserAPI } from '@/api/System/user';
import { userListType, userListResult } from '@/types/user';
import { useTable } from '@/hooks/useTable';
import UserDialog from './UserDialog.vue';
import Pagination from '@/components/Pagination/Pagination.vue';

// 格式化表格数据
const handleTableData = (data: userListResult) => {
  const { list } = data;
  for (const item of list) {
    item.sex = item.sex === 1 ? '男' : '女';
    if (Number(item.userType) === 0) {
      item.userType = '超级管理员';
    } else if (Number(item.userType) === 1) {
      item.userType = '管理员';
    } else {
      item.userType = '普通用户';
    }
  }
  return data;
};

// 获取用户列表表格数据
const { getTableList, tableState, searchTable, resetTable, tableChangeCurrent, tableChangeSize } =
  useTable({
    api: postGetUserListAPI,
    dataCallBack: handleTableData,
  });

onMounted(async () => {
  await getTableList();
});

// 查询条件
const userTableForm = reactive({
  username: '',
});

// 表格是否加载
const tableLoading = ref(false);

// 查询表单节点
const userTableFormRef = ref<FormInstance>();

// 查询
const onClickSearch = async () => {
  tableLoading.value = true;

  // 添加查询参数
  tableState.value.searchParam = userTableForm;

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

// 新增/编辑用户 dialog 节点
const userDialog = ref();

// 新增用户
const onClickAddUser = () => {
  userDialog.value.isShowDialog();
};

// 修改用户状态
const onChangeStatus = (row: userListType) => {
  console.log(row);
  ElMessageBox.confirm(
    `确定要${!row.status ? '禁用' : '启用'} ${row.username} 账户吗？`,
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

// 编辑
const onClickEdit = (row: userListType) => {
  userDialog.value.isShowDialog(row);
};

// 删除
const onClickDel = (row: userListType) => {
  ElMessageBox.confirm(`你确定要删除用户 ${row.username} 吗?`, '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(async () => {
      await deleteUserAPI({ id: row.id });
      // 更新表格
      await getTableList();
      ElMessage({
        message: '删除用户成功',
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
.user-table {
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
@/api/System
