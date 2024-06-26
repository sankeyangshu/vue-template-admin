import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import en from './modules/en.json';
import zhCn from './modules/zh-CN.json';

// 默认使用的语言
const locale = 'zhCn';

/**
 * 创建i18n实例
 */
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

/**
 * 配置i18n国际化
 * @param app vue实例
 */
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export { i18n };
