<template>
  <div class="dept-table">
    <div class="header">
      <el-form :inline="true" :model="deptTableForm" ref="deptTableFormRef">
        <el-form-item label="部门名" prop="deptName">
          <el-input v-model="deptTableForm.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onClickSearch">查询</el-button>
          <el-button icon="Refresh" @click="onClickResetForm(deptTableFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="footer-util">
        <el-button type="primary" icon="Plus" @click="onClickAddDept"> 新增部门 </el-button>
      </div>
      <!-- 表格 -->
      <div class="footer-table">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          border
          stripe
          style="width: 100%; height: 100%"
          row-key="id"
        >
          <el-table-column prop="deptName" label="部门名称" align="center" />
          <el-table-column prop="status" label="状态" align="center">
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
            prop="remark"
            :show-overflow-tooltip="true"
            width="300"
            label="备注"
            align="center"
          />
          <el-table-column prop="createTime" label="创建时间" align="center" width="180" />
          <el-table-column prop="operator" label="操作" width="200px" align="center">
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
const deptTableForm = reactive({
  deptName: '',
});

// 查询表单节点
const deptTableFormRef = ref<FormInstance>();

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

// 新增部门
const onClickAddDept = () => {
  console.log('新增部门');
};

// TODO: 测试数据
const tableData = [
  {
    id: '0',
    deptName: '华东分部',
    orderNo: 1,
    createTime: '2011-02-25 18:37:39',
    remark: '世上无难事，只要肯登攀',
    status: false,
    children: [
      {
        id: '0-0',
        deptName: '研发部',
        orderNo: 1,
        createTime: '1995-10-07 03:22:40',
        remark: '不曾扬帆，何以至远方',
        status: true,
        parentDept: '0',
      },
      {
        id: '0-1',
        deptName: '市场部',
        orderNo: 2,
        createTime: '1972-06-20 09:33:40',
        remark: '努力到无能为力，拼搏到感动自己',
        status: false,
        parentDept: '0',
      },
      {
        id: '0-2',
        deptName: '商务部',
        orderNo: 3,
        createTime: '1992-10-31 02:54:45',
        remark: '没有过不了的坎，就怕自己不奋斗',
        status: false,
        parentDept: '0',
      },
      {
        id: '0-3',
        deptName: '财务部',
        orderNo: 4,
        createTime: '1971-07-06 13:01:49',
        remark: '没有口水与汗水，就没有成功的泪水。',
        status: true,
        parentDept: '0',
      },
    ],
  },
  {
    id: '1',
    deptName: '华南分部',
    orderNo: 2,
    createTime: '1995-12-24 06:36:26',
    remark: '这个世界从来不缺乏机遇，而是缺少抓住机遇的手。',
    status: false,
    children: [
      {
        id: '1-0',
        deptName: '研发部',
        orderNo: 1,
        createTime: '2022-05-10 12:44:05',
        remark: '奋斗令我们的生活充满生机，责任让我们的生命充满意义！',
        status: true,
        parentDept: '1',
      },
      {
        id: '1-1',
        deptName: '市场部',
        orderNo: 2,
        createTime: '2022-07-15 02:53:29',
        remark: '学习之心不可无，懒惰之心不可有。',
        status: true,
        parentDept: '1',
      },
      {
        id: '1-2',
        deptName: '商务部',
        orderNo: 3,
        createTime: '2022-08-11 22:44:55',
        remark: '学会等待，学会坚持，成功是一个循序渐进的过程。',
        status: true,
        parentDept: '1',
      },
      {
        id: '1-3',
        deptName: '财务部',
        orderNo: 4,
        createTime: '2022-10-26 19:38:29',
        remark: '能克服困难的人，可使困难化为良机',
        status: false,
        parentDept: '1',
      },
    ],
  },
  {
    id: '2',
    deptName: '西北分部',
    orderNo: 3,
    createTime: '2022-08-27 16:49:21',
    remark: '行为决定性格，性格决定命运',
    status: false,
    children: [
      {
        id: '2-0',
        deptName: '研发部',
        orderNo: 1,
        createTime: '2022-12-11 03:49:33',
        remark: '带着自己的梦，以一种骄傲的姿态走下去',
        status: false,
        parentDept: '2',
      },
      {
        id: '2-1',
        deptName: '市场部',
        orderNo: 2,
        createTime: '2022-06-18 20:15:34',
        remark: '当世界都在说放弃的时候，轻轻的告诉自己：再试一次',
        status: true,
        parentDept: '2',
      },
      {
        id: '2-2',
        deptName: '商务部',
        orderNo: 3,
        createTime: '2022-07-17 09:37:41',
        remark: '不怕万人阻挡在前方，只怕自己先行投降',
        status: true,
        parentDept: '2',
      },
      {
        id: '2-3',
        deptName: '财务部',
        orderNo: 4,
        createTime: '2022-11-23 04:34:33',
        remark: '胸怀临云志，莫负少年时',
        status: false,
        parentDept: '2',
      },
    ],
  },
];

// 修改部门状态
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

// 编辑部门
const onClickEdit = (row: any) => {
  console.log(row);
};

// 删除部门
const onClickDel = (row: any) => {
  console.log(row);
};
</script>

<style lang="scss" scoped>
.dept-table {
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
