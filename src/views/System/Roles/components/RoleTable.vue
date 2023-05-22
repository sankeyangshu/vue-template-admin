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
          :data="tableData"
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
          <el-table-column prop="roleType" label="角色类型" align="center" width="120" />
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
      <div class="footer-pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';

// 查询条件
const roleTableForm = reactive({
  roleName: '',
});

// 查询表单节点
const roleTableFormRef = ref<FormInstance>();

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

// 新增角色
const onClickAddRole = () => {
  console.log('新增角色');
};

// TODO: 测试数据
const tableData = [
  {
    roleName: '超级管理员',
    roleType: 'admin',
    description: '这是超级管理员，拥有一切权限',
    createtime: '2022-09-02 15:30:20',
    status: true,
  },
  {
    roleName: '管理员',
    roleType: 'admin',
    description: '普通管理员',
    createtime: '2022-09-02 15:30:20',
    status: true,
  },
  {
    roleName: '普通用户',
    description: '测试用户',
    roleType: 'other',
    createtime: '2022-09-02 15:30:20',
    status: true,
  },
];

// 修改角色状态
const onChangeStatus = (row: any) => {
  ElMessageBox.confirm(
    `确定要${!row.status ? '禁用' : '启用'} ${row.username} 角色吗？`,
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
const onClickEdit = (row: any) => {
  console.log(row);
};

// 删除角色
const onClickDel = (row: any) => {
  console.log(row);
};
</script>

<style lang="scss" scoped>
.role-table {
  position: relative;
  width: 100%;
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
