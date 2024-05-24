import { computed, ref } from 'vue';

/**
 * 分页参数类型
 */
interface pageableType {
  total: number;
  pageNum: number;
  pageSize: number;
}

/**
 * 表格类型
 */
interface tableStateType {
  tableData: any[];
  pageable: pageableType;
  searchParam: Record<string, any>;
  searchInitParam: Record<string, any>;
  totalParam: Record<string, any>;
  icon?: Record<string, any>;
}

/**
 * useTable参数类型
 */
interface tableParamsType {
  /**
   * 获取表格数据 api 方法 (必传)
   */
  api: (params: any) => Promise<any>;

  /**
   * 获取数据初始化参数 (非必传，默认为{})
   */
  initParam?: object;

  /**
   * 是否有分页 (非必传，默认为true)
   */
  isPageable?: boolean;

  /**
   * 对后台返回的数据进行处理的方法 (非必传)
   */
  dataCallBack?: (data: any) => any;

  /**
   * 异常处理方法 (非必传)
   */
  requestError?: (error: any) => void;
}

/**
 * table 页面操作方法封装
 * @param {tableParamsType} option 配置参数
 * @return 表格处理函数
 * */
export const useTable = (option: tableParamsType) => {
  const { api, initParam, isPageable = true, dataCallBack, requestError } = option;

  // 表格数据对象
  const tableState = ref<tableStateType>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0,
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  });

  /**
   * 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   */
  const pageParam = computed(() => ({
    pageNum: tableState.value.pageable.pageNum,
    pageSize: tableState.value.pageable.pageSize,
  }));

  /**
   * 获取表格数据
   */
  const getTableList = async () => {
    // 判断获取表格数据api方法是否存在
    if (!api) return;

    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(tableState.value.totalParam, initParam, isPageable ? pageParam.value : {});

      // 请求表格数据
      let { data } = await api({
        ...tableState.value.searchInitParam,
        ...tableState.value.totalParam,
      });

      // 判断数据处理函数是否存在，并处理数据
      dataCallBack && (data = dataCallBack(data));

      // 获取从后端返回的表格数据
      tableState.value.tableData = isPageable ? data.list : data;

      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      const { pageNum, pageSize, total } = data;
      isPageable && updatePageable({ pageNum, pageSize, total });
    } catch (error) {
      requestError && requestError(error);
    }
  };

  /**
   * 更新分页信息
   * @param {pageableType} resPageable 后台返回的分页数据
   * */
  const updatePageable = (resPageable: pageableType) => {
    Object.assign(tableState.value.pageable, resPageable);
  };

  /**
   * 更新查询参数
   */
  const updatedTotalParam = () => {
    // 清空上一次查询的参数
    tableState.value.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: Record<string, any> = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (const key in tableState.value.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (
        tableState.value.searchParam[key] ||
        tableState.value.searchParam[key] === false ||
        tableState.value.searchParam[key] === 0
      ) {
        nowSearchParam[key] = tableState.value.searchParam[key];
      }
    }
    Object.assign(tableState.value.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
  };

  /**
   * 表格数据查询
   */
  const searchTable = async () => {
    // 重置分页数据
    tableState.value.pageable.pageNum = 1;
    updatedTotalParam();
    await getTableList();
  };

  /**
   * 表格数据重置
   */
  const resetTable = async () => {
    // 重置分页数据
    tableState.value.pageable.pageNum = 1;
    tableState.value.searchParam = {};
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(tableState.value.searchInitParam).forEach((key) => {
      tableState.value.searchParam[key] = tableState.value.searchInitParam[key];
    });
    updatedTotalParam();
    await getTableList();
  };

  /**
   * 每页条数改变
   * @param {Number} val 当前条数
   */
  const tableChangeSize = async (val: number) => {
    tableState.value.pageable.pageNum = 1;
    tableState.value.pageable.pageSize = val;
    await getTableList();
  };

  /**
   * 当前页改变
   * @param {Number} val 当前页
   */
  const tableChangeCurrent = async (val: number) => {
    tableState.value.pageable.pageNum = val;
    await getTableList();
  };

  return {
    tableState,
    getTableList,
    updatedTotalParam,
    searchTable,
    resetTable,
    tableChangeSize,
    tableChangeCurrent,
  };
};
