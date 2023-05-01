import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
// 按需加载 Element Plus
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

function resolve(dir: string) {
  return path.join(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    //  使用 svg 图标
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // 配置i18n
    VueI18nPlugin({
      // 指定需要导入的语言包文件夹
      include: path.resolve(__dirname, './src/i18n/lang/**'),
    }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': resolve('src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "./src/styles/variables.scss" as *;`,
      },
    },
  },
});
