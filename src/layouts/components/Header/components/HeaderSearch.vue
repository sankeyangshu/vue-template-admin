<template>
  <div class="header-search">
    <el-tooltip effect="dark" :content="$t('navBar.headerSearch')" placement="bottom">
      <el-icon size="22px" class="header-icon" @click="onClickShowSearch">
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
        :placeholder="$t('navBar.headerSearchText')"
        class="header-search-select"
        @change="onChangeSelect"
      >
        <el-option
          v-for="option in searchOptions"
          :key="option.item.path"
          :label="option.item.title.join(' > ')"
          :value="option.item"
        >
        </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Fuse, { FuseResult } from 'fuse.js'; // https://fusejs.io/ fuse.js文档
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { filterRouteType, generateRoutes } from '@/utils/FuseData';
import { filterRoutes } from '@/utils/routers';

// 是否显示搜索弹出框
const isShowSearchDialog = ref(false);

/**
 * 显示/隐藏搜索框
 */
const onClickShowSearch = () => {
  isShowSearchDialog.value = !isShowSearchDialog.value;
};

// 获取路由实例
const router = useRouter();

// 数据源
let searchPool = computed(() => {
  const routes = filterRoutes(router.getRoutes());
  return generateRoutes(routes);
});

/**
 * 搜索库相关
 */
let fuse: Fuse<filterRouteType>;

/**
 * 初始化fuse模糊搜索配置
 * @param {filterRouteType[]} searchPool 搜索的数据源
 */
const initFuse = (searchPool: filterRouteType[]) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  });
};

// 初始化fuse
initFuse(searchPool.value);

// 搜索结果
const searchOptions = ref<FuseResult<filterRouteType>[]>([]);

/**
 * 搜索方法
 * @param {string} query 搜索值
 */
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query);
  } else {
    searchOptions.value = [];
  }
};

// 搜索关键词
const search = ref('');

/**
 * 选中搜索结果-并跳转到具体页面
 * @param {filterRouteType} val 路由对象
 */
const onChangeSelect = (val: filterRouteType) => {
  search.value = '';
  router.push(val.path);
  onClickShowSearch();
};
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

/* 菜单搜索样式 */
.header-search {
  :deep(.el-dialog) {
    padding: 0;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .header-search-select {
    height: 50px;
    :deep(.el-select__wrapper) {
      height: 50px;
    }
  }
}
</style>
