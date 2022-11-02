/*
 * @Description: svg图标导出文件
 * @Author: 三棵杨树
 * @Date: 2022-11-02 20:16:11
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-11-02 20:57:25
 */
import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg图标组件

export default (app: App<Element>) => {
  app.component('svg-icon', SvgIcon);
};
