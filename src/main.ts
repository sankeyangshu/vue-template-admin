import { createApp } from 'vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import App from './App.vue';
import 'normalize.css'; // 统一各个浏览器之间的显示差异
import './styles/index.scss'; // 全局css
import 'virtual:svg-icons-register'; // svg-icons注册导入
import setupSvgIcons from '@/icons'; // 导入svg图标组件
import setupElementPlus from '@/plugins/element'; // 导入element plus

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

  app.mount('#app');
}

bootstrap();
