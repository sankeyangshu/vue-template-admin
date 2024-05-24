import { createApp } from 'vue';
import { setupDirectives } from '@/directives'; // 导入自定义指令
import { setupI18n } from '@/i18n'; // 导入i18n
import setupElementPlus from '@/plugins/element'; // 导入element plus
import setupSvgIcons from '@/plugins/icons'; // 导入svg图标组件
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';
import './styles/index.scss'; // 导入默认样式
import 'virtual:svg-icons-register'; // svg-icons注册导入
// import './config/permission'; // 导入路由鉴权-加载异步路由

function bootstrap() {
  // 创建实例
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 配置路由
  setupRouter(app);

  // 导入svg图标
  setupSvgIcons(app);

  // 导入element和全局注册element 图标
  setupElementPlus(app);

  // 导入i18n国际化
  setupI18n(app);

  // 导入自定义指令
  setupDirectives(app);

  app.mount('#app');
}

bootstrap();
