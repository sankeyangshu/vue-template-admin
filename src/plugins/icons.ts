import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg图标组件

/**
 * 导入svg图标
 */
export default (app: App<Element>) => {
  app.component('svg-icon', SvgIcon);
};
