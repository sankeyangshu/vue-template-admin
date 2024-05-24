import dayjs from 'dayjs';
import path from 'path';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/getEnv';
import { createVitePlugins } from './build/plugins';
import { createProxy } from './build/proxy';
import pkg from './package.json';

function resolve(dir: string) {
  return path.join(__dirname, '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  // APP 后台管理信息
  pkg: { dependencies, devDependencies, name, version },
  // 最后编译时间
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  // process.cwd() 方法返回 Node.js 进程的当前工作目录
  const root = process.cwd();
  // mode 返回应用的环境模式 development（开发环境） 或者 production（生产环境）
  const { mode } = config;
  // loadEnv() 根据 mode 检查 root(项目根路径) 路径下 .env、.env.development 环境文件，输出 NODE_ENV 和 VITE_ 开头的键值队
  const env = loadEnv(mode, process.cwd());
  // 读取并处理所有环境变量配置文件 .env
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,

    // 加载插件
    plugins: createVitePlugins(viteEnv),
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

    // 跨域代理
    server: {
      host: true,
      // port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },

    // 定义全局常量替换方式
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    esbuild: {
      // 使用 esbuild 压缩 剔除 console.log
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },

    build: {
      minify: 'esbuild',
      // 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
      sourcemap: false,
      // 指定输出路径（相对于 项目根目录)
      outDir: 'dist',
      // 只有 minify 为 terser 的时候, 本配置项才能起作用
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      //     keep_infinity: true,
      //     // 打包是否自动删除 console
      //     drop_console: viteEnv.VITE_DROP_CONSOLE,
      //   },
      // },
      // 启用/禁用 gzip 压缩大小报告 - 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
    },
  };
});
