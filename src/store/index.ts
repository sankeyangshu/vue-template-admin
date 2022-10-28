/*
 * @Description: pinia 全局仓库入口文件
 * @Author: 三棵杨树
 * @Date: 2022-10-27 20:44:14
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-28 20:48:32
 */

import { App } from 'vue';
import { createPinia } from 'pinia';

// 创建pinia实例
const store = createPinia();

// 配置pinia
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
