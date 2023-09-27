import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 引入持久化插件
import { App } from 'vue';

// 创建pinia实例
const store = createPinia();

// 使用数据持久化插件
store.use(piniaPluginPersistedstate);

// 配置pinia
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
