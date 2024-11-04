import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import demoStore from '@/store/Demo';
import detailLoader from '@/pages/Detail/Loader/detailLoader';

/**
 * 访问任何理由页面都会请求container.js这个chunk，因为其是所有页面的父级
 * 推荐还是单独打成一个chunk
 * 如果home页面也chunk也为这个，首次加载的时候会减少js文件请求，但是切换到其他的路由，会重新加载container.js且包含home页面中的js
 */
const PageTransition = lazy(
  () =>
    import(
      /* webpackChunkName:"container" */ '@/layout/PageTransition/PageTransition'
    )
);
const Layout = lazy(() => import(/* webpackChunkName:"home" */ '@/layout'));

const Home = lazy(() => import(/* webpackChunkName:"home" */ '@/pages/Home'));

const Detail = lazy(
  () => import(/* webpackChunkName:"detail" */ '@/pages/Detail')
);

const Login = lazy(
  () => import(/* webpackChunkName:"login" */ '@/pages/Login')
);

const ErrorPage = lazy(
  () => import(/* webpackChunkName:"not-found" */ '@/pages/404')
);

const User = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/User'));

const Task = lazy(() => import(/* webpackChunkName:"task" */ '@/pages/Task'));

export const routerData: RouteObject[] = [
  {
    element: <PageTransition />,
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'detail/:detailId',
            /**
             * 需要等detailLoader完全加载完毕后才会显示detail页面的路由，有点同步的感觉
             */
            loader: detailLoader,
            element: <Detail />,
          },
          {
            path: 'user',
            element: <User demoState={demoStore} />,
          },
        ],
      },
      {
        path: 'task',
        element: <Task />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export default createBrowserRouter(routerData);
