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
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getMenuListAPI } from '@/api/System/menu';
import { menuListType } from '@/types/menu';
import { useTable } from '@/hooks/useTable';

// 格式化表格数据
const handleTableData = (data: menuListType[]) => {
  for (const item of data) {
    item.authType = item.authType === 1 ? '菜单' : '接口';
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

// 新增菜单
const onClickAddMenu = () => {
  console.log('新增菜单');
};

// // TODO: 测试数据
// const tableData = [
//   {
//     menuName: '首页',
//     menuType: '菜单',
//     menuRouter: '/home',
//     identification: 'menu:home',
//     parentId: 0,
//     level: 1,
//     id: 0,
//     createTime: '2022-09-02',
//   },
//   {
//     menuName: '表格',
//     menuType: '目录',
//     menuRouter: '/table',
//     identification: 'menu:table',
//     parentId: 0,
//     level: 1,
//     id: 1,
//     createTime: '2022-09-02',
//     children: [
//       {
//         menuName: '菜单1',
//         menuType: '菜单',
//         menuRouter: '/table',
//         identification: 'menu1:view',
//         parentId: 1,
//         level: 2,
//         id: 10,
//         createTime: '2022-09-02',
//         children: [
//           {
//             menuName: '按钮1',
//             menuType: '按钮',
//             menuRouter: '/table',
//             identification: 'menu1:view:btn1',
//             parentId: 10,
//             id: 20,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮2',
//             menuType: '按钮',
//             menuRouter: '/table',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 21,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮3',
//             menuType: '按钮',
//             menuRouter: '/table',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 22,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     menuName: '可视化图表',
//     menuType: '目录',
//     menuRouter: '/charts',
//     identification: 'menu:charts',
//     parentId: 0,
//     level: 1,
//     id: 1,
//     createTime: '2022-09-02',
//     children: [
//       {
//         menuName: '菜单1',
//         menuType: '菜单',
//         menuRouter: '/charts',
//         identification: 'menu1:view',
//         parentId: 1,
//         level: 2,
//         id: 10,
//         createTime: '2022-09-02',
//         children: [
//           {
//             menuName: '按钮1',
//             menuType: '按钮',
//             menuRouter: '/charts',
//             identification: 'menu1:view:btn1',
//             parentId: 10,
//             id: 20,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮2',
//             menuType: '按钮',
//             menuRouter: '/charts',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 21,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮3',
//             menuType: '按钮',
//             menuRouter: '/charts',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 22,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     menuName: '基础组件',
//     menuType: '目录',
//     menuRouter: '/components',
//     identification: 'menu:components',
//     parentId: 0,
//     level: 1,
//     id: 1,
//     createTime: '2022-09-02',
//     children: [
//       {
//         menuName: '菜单1',
//         menuType: '菜单',
//         menuRouter: '/components',
//         identification: 'menu1:view',
//         parentId: 1,
//         level: 2,
//         id: 10,
//         createTime: '2022-09-02',
//         children: [
//           {
//             menuName: '按钮1',
//             menuType: '按钮',
//             menuRouter: '/components',
//             identification: 'menu1:view:btn1',
//             parentId: 10,
//             id: 20,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮2',
//             menuType: '按钮',
//             menuRouter: '/components',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 21,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//           {
//             menuName: '按钮3',
//             menuType: '按钮',
//             menuRouter: '/components',
//             identification: 'menu1:view:btn2',
//             parentId: 10,
//             id: 22,
//             level: 3,
//             createTime: '2022-09-02',
//           },
//         ],
//       },
//     ],
//   },
// ];

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
