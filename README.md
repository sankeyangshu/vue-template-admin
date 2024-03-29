<h1 align="center">
  vue-template-admin
</h1>
<h4 align="center">使用 Vue3 + TS 构建的后台管理系统</h4>

<p align="center">
  <img src="https://img.shields.io/github/license/sankeyangshu/vue-template-admin" alt="license" />
  <img src="https://img.shields.io/github/package-json/v/sankeyangshu/vue-template-admin" alt="version" />
  <img src="https://img.shields.io/github/languages/top/sankeyangshu/vue-template-admin" alt="languages" />
</p>

---

## 简介

🚀🚀🚀 **vue-template-admin** 使用了最新的`Vue3.2`、`Vite4`、`Pinia2`、`Typescript`等主流技术开发，集成 `Dark Mode`(暗黑)模式，并且持久化保存，集成了代码规范检查工具`Eslint`、`Prettier`、`Stylelint`。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。你可以在此之上直接开发你的业务代码！希望你能喜欢。👋👋👋

**注 1：如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！**

**注 2：由于本人工作较忙，所以项目更新频率较慢，但是本项目会长期维护，有问题可以提 issue， 同时也欢迎大家来共建此项目，包括但不限于：bug 修复、代码优化、功能开发等等**

## ✨ 项目功能

- 🚀 使用 Vue3.2 + TypeScript 开发，单文件组件**＜ script setup ＞**
- 🚀 采用 Vite4 作为项目开发、打包工具（配置 Gzip 打包、TSX 语法、跨域代理…）
- 🚀 整个项目集成了 TypeScript
- 🚀 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 🚀 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 🚀 支持 Element 组件大小切换、暗黑模式、i18n 国际化
- 🚀 使用 VueRouter 进行路由权限拦截、页面按钮权限配置、路由懒加载
- 🚀 使用 KeepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 🚀 常用自定义指令开发（权限、复制、水印、拖拽、节流、防抖、长按…）
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint 规范提交信息（项目规范配置）

## 基础知识

提前了解和学习这些知识会对使用本项目有很大的帮助。

- [Vue3](https://v3.vuejs.org/) - 熟悉 `Vue3` 基础语法
- [Vite](https://cn.vitejs.dev/) - 熟悉 `Vite` 特性
- [Pinia](https://pinia.vuejs.org/) - 熟悉 `Pinia` 特性
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Vue-Router](https://router.vuejs.org/) - 熟悉 `Vue-Router` 基本使用
- [Element Plus](https://element-plus.org/zh-CN/) - 熟悉 `Element Plus` 组件库基本使用
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 `ES6` 基本语法

## 配套资源

- [nest-template-cms](https://github.com/sankeyangshu/nest-template-cms) - 使用 Nest + TS 构建的 CMS 开发框架
- [react-template-admin](https://github.com/sankeyangshu/react-template-admin) - 使用 React + TS 构建的后台管理系统

## 环境准备

本地环境需要安装 [pnpm7.x](https://www.pnpm.cn/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

- 必须使用[pnpm7.x](https://www.pnpm.cn/)，否则依赖可能安装不上。
- [Node.js](http://nodejs.org/) 版本要求`12.x`以上，这里推荐 `16.x` 及以上。

## Vscode 配套插件

如果你使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - vue 开发必备
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化

## 安装和使用

### 🚀 使用脚手架

[Galaxy-CLI](https://github.com/sankeyangshu/galaxy-cli) 是一个用于快速生成各种**前后端项目模版**的脚手架。

```bash
# 选择合适的包管理工具安装脚手架
npm i -g galaxy-cli-core

# yarn
yarn global add galaxy-cli-core

# 推荐使用pnpm进行安装
pnpm i -g galaxy-cli-core

# 创建项目,按照脚手架提示，选择vue-template-admin模板
galaxy init <projectName>

# 进入项目目录
cd <projectName>

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务
pnpm dev

# 打包发布
pnpm build
```

### 克隆使用

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/vue-template-admin.git

# 进入项目目录
cd vue-template-admin

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务
pnpm dev

# 打包发布
pnpm build
```

## 如何贡献

你可以[提一个 issue](https://github.com/sankeyangshu/vue-template-admin/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor`: 代码重构（不包括 bug 修复、功能新增）
- `perf`: 性能优化
- `test`: 添加、修改测试用例
- `build`: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci`: 修改 CI 配置、脚本
- `chore`: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert`: 回滚 commit

## 浏览器支持

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不在支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| [<img src="https://i.imgtg.com/2023/04/11/8z7ot.png" alt=" IE" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                      not support                                                                       |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## 许可证

[MIT License](https://github.com/sankeyangshu/vue-template-admin/blob/master/LICENSE)
