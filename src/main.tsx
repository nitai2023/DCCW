import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Home } from './views/Home';
import { Login } from './views/login';
import { Dashboard } from './views/Dashboard';
import { PersonalCenter } from './views/dashboardViews/PersonalCenter';
import { OrderManangement } from './views/dashboardViews/OrderManangement';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/personalcenter',
        element: <PersonalCenter></PersonalCenter>,
      },
      {
        path: '/dashboard/ordermanangement',
        element: <OrderManangement></OrderManangement>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
