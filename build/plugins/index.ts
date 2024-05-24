import vue from '@vitejs/plugin-vue';
import type { PluginOption } from 'vite';
import { configCompressPlugin } from './compress';
import { configVueI18nPlugin } from './i18nPlugin';
import { configSvgIconsPlugin } from './svgPlugin';
// 按需加载 Element Plus
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

/**
 * 配置 vite 插件
 * @param {ViteEnv} viteEnv vite 环境变量配置文件键值队 object
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  return [
    vue(),
    // 按需加载 Element Plus
    // AutoImport({
    //   // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    //   resolvers: [ElementPlusResolver()],
    //   dts: resolve('src/types/auto-imports.d.ts'),
    // }),
    // Components({
    //   resolvers: [
    //     // 自动导入 Element Plus 组件
    //     ElementPlusResolver(),
    //   ],
    //   dts: resolve('src/types/components.d.ts'),
    // }),

    // 使用 svg 图标
    configSvgIconsPlugin(),

    // 配置i18n
    configVueI18nPlugin(),

    // 创建打包压缩配置
    configCompressPlugin(viteEnv),
  ];
};
