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
          :data="tableData"
          border
          stripe
          style="width: 100%; height: 100%"
        >
          <el-table-column prop="username" label="用户名" align="center" width="100" />
          <el-table-column prop="nickname" label="昵称" align="center" />
          <el-table-column prop="sex" label="性别" align="center" />
          <el-table-column prop="role" label="关联角色" align="center" width="120" />
          <el-table-column prop="photo" label="手机号" align="center" width="120" />
          <el-table-column prop="status" label="用户状态" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="describe"
            :show-overflow-tooltip="true"
            width="180"
            label="用户描述"
            align="center"
          />
          <el-table-column prop="createTime" label="创建时间" align="center" width="180" />
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
        <el-pagination
          v-model:currentPage="currentPage"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import UserDialog from './UserDialog.vue';

/**
 * 表格数据类型
 */
interface tableDataType {
  username: string;
  nickname: string;
  sex: string;
  role: string;
  status: boolean;
  photo: string;
  describe: string;
  createTime: string;
}

// 查询条件
const userTableForm = reactive({
  username: '',
});

// 表格是否加载
const tableLoading = ref(false);

// 查询表单节点
const userTableFormRef = ref<FormInstance>();

// 查询
const onClickSearch = () => {
  console.log('用户查询');
  tableLoading.value = true;
  setTimeout(() => {
    tableLoading.value = false;
  }, 1000);
};

// 重置
const onClickResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 新增/编辑用户 dialog 节点
const userDialog = ref();

// 新增用户
const onClickAddUser = () => {
  userDialog.value.isShowDialog();
};

// 编辑
const onClickEdit = (row: tableDataType) => {
  console.log(`edit ${row}`);
};

// 删除
const onClickDel = (row: tableDataType) => {
  console.log(`del ${row}`);
};

// TODO: 测试数据
const tableData = [
  {
    username: 'zhangsan',
    nickname: '张三',
    sex: '男',
    role: '超级管理员',
    status: true,
    photo: '15333333333',
    describe: '超级管理员不可删除',
    createTime: '2022-09-02 15:30:20',
  },
  {
    username: 'lisi',
    nickname: '李四',
    sex: '男',
    role: '管理员',
    status: true,
    photo: '13823456789',
    describe: '测试账户',
    createTime: '2022-09-02 15:30:20',
  },
  {
    username: 'wangwu',
    nickname: '王五',
    sex: '男',
    role: '普通用户',
    status: false,
    photo: '13923456789',
    describe: '普通测试用户',
    createTime: '2022-09-02 15:30:20',
  },
];

// 分页-当前页数
const currentPage = ref(1);

// 改变每页显示条目个数
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

// 当前页数改变
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="scss" scoped>
.user-table {
  position: relative;
  width: calc(100% - 230px);
  display: flex;
  flex: 1;
  flex-direction: column;
  .header {
    padding: 16px 16px 0px 16px;
    margin-bottom: 16px;
    display: flex;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
  }
  .footer {
    position: relative;
    padding: 16px;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    box-sizing: border-box;
    .footer-util {
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
    }
    .footer-table {
      position: relative;
      flex: 1;
    }
    .footer-pagination {
      width: 100%;
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
      box-sizing: border-box;
    }
  }
}
</style>
