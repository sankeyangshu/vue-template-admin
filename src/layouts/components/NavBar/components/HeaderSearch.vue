<template>
  <div class="header-search">
    <el-tooltip effect="dark" :content="$t('navBar.headerSearch')" placement="bottom">
      <el-icon size="22px" class="bell header-icon" @click="onClickShowSearch">
        <Search />
      </el-icon>
    </el-tooltip>
    <el-dialog v-model="isShowSearchDialog" width="600px" destroy-on-close :show-close="false">
      <el-select
        v-model="search"
        :remote-method="querySearch"
        style="width: 100%"
        ref="headerSearchSelect"
        filterable
        default-first-option
        remote
        placeholder="菜单搜索 ：支持菜单名称、路径"
        class="header-search-select"
        @change="onChangeSelect"
      >
        <el-option v-for="item in 5" :key="item" :value="item" :label="item"> </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 是否显示搜索弹出框
const isShowSearchDialog = ref(false);

/**
 * 显示/隐藏搜索框
 */
const onClickShowSearch = () => {
  isShowSearchDialog.value = !isShowSearchDialog.value;
};

// 搜索关键词
const search = ref('');

/**
 * 搜索方法
 */
const querySearch = () => {
  console.log('搜索');
};

/**
 * 选中搜索结果
 */
const onChangeSelect = () => {
  console.log('123');
};
</script>

<style lang="scss" scoped>
.header-search {
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  .item-info-pop {
    display: flex;
    align-items: center;
  }
  .bell {
    color: black;
  }
  .item-child {
    display: flex;
    align-items: center;
    font-size: 13px;
  }
}
.transverseMenu {
  .bell {
    color: white;
  }
}

/* 菜单搜索样式 */
.header-search {
  :deep(.el-dialog) {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .header-search-select {
    height: 50px;
    :deep(.el-input__wrapper) {
      height: 50px;
    }
  }
}
</style>
