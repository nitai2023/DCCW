import React from 'react';

const Home = React.lazy(() => import('../views/Home'));
const Login = React.lazy(() => import('../views/Login'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/Login',
    exact: true,
    component: Login,
  },
];

export default routes;
