import DemoRouter from './router-demo';

const routes = [
  {
    path: '/',
    redirect: '/tabs',
  },

  {
    path: '/',
    component: '@/App',
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
      },
      {
        path: '/tabs',
        component: '@/pages/tabs',
      },
      ...DemoRouter, //demo路由
    ],
  },
];

export default routes;
