import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

/**
 * 配置svg vite 插件
 */
export function configSvgIconsPlugin() {
  // 使用 svg 图标
  const svgIconsPlugin = createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
