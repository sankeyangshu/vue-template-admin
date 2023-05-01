import { createApp } from 'vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import App from './App.vue';
import './styles/index.scss'; // 导入默认样式
import 'virtual:svg-icons-register'; // svg-icons注册导入
import setupSvgIcons from '@/plugins/icons'; // 导入svg图标组件
import setupElementPlus from '@/plugins/element'; // 导入element plus
import setupI18n from '@/i18n'; // 导入i18n

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

  app.mount('#app');
}

bootstrap();
