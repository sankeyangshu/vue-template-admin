/*
 * @Description: vite 配置文件
 * @Author: 三棵杨树
 * @Date: 2022-10-27 20:59:20
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-28 20:30:16
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
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
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
