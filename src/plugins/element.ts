import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 统一导入el-icon图标

export default (app: App<Element>) => {
  app.use(ElementPlus);
  // 统一注册el-icon图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};
