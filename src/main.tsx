import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Home } from './views/Home';
import { Login } from './views/login';
import { Dashboard } from './views/Dashboard';
import { PersonalCenter } from './views/dashboardViews/PersonalCenter';
import { DataAnalysis } from './views/dashboardViews/DataAnalysis';
import { MyEmail } from './views/dashboardViews/personalCenterViews/MyEmail';
import { Complaints } from './views/dashboardViews/personalCenterViews/Complaints';
import { ManageAdmin } from './views/dashboardViews/ManageAdmin';
import { Voucher } from './views/dashboardViews/Voucher';
import { Commodity } from './views/dashboardViews/Commodity';
import { VipCenter } from './views/dashboardViews/VipCenter';
import { RiderInformationManagement } from './views/dashboardViews/RiderInformationManagement';
import { Chat } from './views/dashboardViews/Chat';
import { Order } from './views/dashboardViews/Order';
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
        children: [
          {
            path: '/dashboard/personalcenter/myemail',
            element: <MyEmail></MyEmail>,
          },
          {
            path: '/dashboard/personalcenter/complaints',
            element: <Complaints></Complaints>,
          },
        ],
      },
      {
        path: '/dashboard/dataanlysis',
        element: <DataAnalysis></DataAnalysis>,
      },
      {
        path: '/dashboard/manageadmin',
        element: <ManageAdmin></ManageAdmin>,
      },
      {
        path: '/dashboard/voucher',
        element: <Voucher></Voucher>,
      },
      {
        path: '/dashboard/commodity',
        element: <Commodity></Commodity>,
      },
      {
        path: '/dashboard/vipcenter',
        element: <VipCenter></VipCenter>,
      },
      {
        path: '/dashboard/riderinformationmanagement',
        element: <RiderInformationManagement></RiderInformationManagement>,
      },
      {
        path: '/dashboard/chat',
        element: <Chat></Chat>,
      },
      {
        path: '/dashboard/order',
        element: <Order></Order>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
