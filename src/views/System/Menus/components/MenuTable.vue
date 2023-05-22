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
          :data="tableData"
          border
          stripe
          style="width: 100%; height: 100%"
          row-key="id"
        >
          <el-table-column prop="menuName" label="菜单名称" />
          <el-table-column prop="menuType" label="菜单类型" />
          <el-table-column prop="menuRouter" label="菜单路由" />
          <el-table-column prop="identification" label="菜单标识" />
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
import { reactive, ref } from 'vue';

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

// TODO: 测试数据
const tableData = [
  {
    menuName: '首页',
    menuType: '菜单',
    menuRouter: '/home',
    identification: 'menu:home',
    parentId: 0,
    level: 1,
    id: 0,
    createTime: '2022-09-02',
  },
  {
    menuName: '表格',
    menuType: '目录',
    menuRouter: '/table',
    identification: 'menu:table',
    parentId: 0,
    level: 1,
    id: 1,
    createTime: '2022-09-02',
    children: [
      {
        menuName: '菜单1',
        menuType: '菜单',
        menuRouter: '/table',
        identification: 'menu1:view',
        parentId: 1,
        level: 2,
        id: 10,
        createTime: '2022-09-02',
        children: [
          {
            menuName: '按钮1',
            menuType: '按钮',
            menuRouter: '/table',
            identification: 'menu1:view:btn1',
            parentId: 10,
            id: 20,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮2',
            menuType: '按钮',
            menuRouter: '/table',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 21,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮3',
            menuType: '按钮',
            menuRouter: '/table',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 22,
            level: 3,
            createTime: '2022-09-02',
          },
        ],
      },
    ],
  },
  {
    menuName: '可视化图表',
    menuType: '目录',
    menuRouter: '/charts',
    identification: 'menu:charts',
    parentId: 0,
    level: 1,
    id: 1,
    createTime: '2022-09-02',
    children: [
      {
        menuName: '菜单1',
        menuType: '菜单',
        menuRouter: '/charts',
        identification: 'menu1:view',
        parentId: 1,
        level: 2,
        id: 10,
        createTime: '2022-09-02',
        children: [
          {
            menuName: '按钮1',
            menuType: '按钮',
            menuRouter: '/charts',
            identification: 'menu1:view:btn1',
            parentId: 10,
            id: 20,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮2',
            menuType: '按钮',
            menuRouter: '/charts',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 21,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮3',
            menuType: '按钮',
            menuRouter: '/charts',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 22,
            level: 3,
            createTime: '2022-09-02',
          },
        ],
      },
    ],
  },
  {
    menuName: '基础组件',
    menuType: '目录',
    menuRouter: '/components',
    identification: 'menu:components',
    parentId: 0,
    level: 1,
    id: 1,
    createTime: '2022-09-02',
    children: [
      {
        menuName: '菜单1',
        menuType: '菜单',
        menuRouter: '/components',
        identification: 'menu1:view',
        parentId: 1,
        level: 2,
        id: 10,
        createTime: '2022-09-02',
        children: [
          {
            menuName: '按钮1',
            menuType: '按钮',
            menuRouter: '/components',
            identification: 'menu1:view:btn1',
            parentId: 10,
            id: 20,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮2',
            menuType: '按钮',
            menuRouter: '/components',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 21,
            level: 3,
            createTime: '2022-09-02',
          },
          {
            menuName: '按钮3',
            menuType: '按钮',
            menuRouter: '/components',
            identification: 'menu1:view:btn2',
            parentId: 10,
            id: 22,
            level: 3,
            createTime: '2022-09-02',
          },
        ],
      },
    ],
  },
];

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
