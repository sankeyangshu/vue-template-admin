import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import zhCn from './lang/zh-cn';
import en from './lang/en';

// 默认使用的语言
const locale = 'zhCn';

// 创建i18n实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  // 使用的语言
  locale,
  // 语言配置文件
  messages: {
    zhCn,
    en,
  },
});

// 配置i18n国际化
export default (app: App<Element>) => {
  app.use(i18n);
};
