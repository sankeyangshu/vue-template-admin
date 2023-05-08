import { router } from '@/router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import { i18n } from '@/i18n';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条样式

// 进度条配置
NProgress.configure({ showSpinner: false });

// 白名单-不需要权限验证
const whiteList = ['/login'];

/**
 * @description: 路由前置守卫
 * @param to 要到哪里去
 * @param from 从哪里来
 * @param next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start();

  // 设置标题
  if (typeof to.meta.title === 'string') {
    document.title = i18n.global.t(`route.${to.meta.title}`) || import.meta.env.VITE_APP_TITLE;
  }

  // 获取用户信息 stroe
  const userStore = useUserStore();
  // 获取用户是否登录状态，确定用户是否已登录过，存在Token
  const hasToken = userStore.token;

  if (hasToken) {
    // 用户登录
    if (to.path === '/login') {
      // 如果已登录，重定向到主页
      next({ path: '/' });
    } else {
      // 获取用户权限 store
      const permissionStore = usePermissionStore();
      // 确定用户是否已通过getInfo获得其权限角色
      // const hasRoles = userStore.roles && userStore.roles.length > 0;
      try {
        // 路由添加进去了没有及时更新 需要重新进去一次拦截
        if (!permissionStore.routes.length) {
          // 获取权限列表进行接口访问 因为这里页面要切换权限
          const accessRoutes = await permissionStore.generateRoutes(userStore.roles);

          // 动态添加访问路由表
          accessRoutes.forEach((item) => router.addRoute(item));

          // 这里相当于push到一个页面 不在进入路由拦截
          next({ ...to, replace: true });
        } else {
          // 如果不传参数就会重新执行路由拦截，重新进到这里
          next();
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    // 用户未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next();
    } else {
      // 没有访问权限的其他页面将重定向到登录页面
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  // 进度条结束
  NProgress.done();
});
