/*
 * @Description: eslint 配置文件
 * @Author: 三棵杨树
 * @Date: 2022-10-14 19:27:13
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-27 21:01:31
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  parser: 'vue-eslint-parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/promise-function-async': 'off',
  },
};
