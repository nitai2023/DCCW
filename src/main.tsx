import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { Chat } from './views/dashboardViews/chat/Chat';
import { Order } from './views/dashboardViews/Order';
import { Database } from './views/dashboardViews/Database';
import { SnackbarProvider } from './components/SnackbarProvider';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 你可以根据需要调整 primary 颜色
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            border: '1px solid transparent', // 去掉选中状态的黑边
            backgroundColor: '#1976d2', // 选中状态的背景色
            color: 'white', // 选中状态的文本色
            minwith: '200px', // 设置按钮的最小宽度

            '&:hover': {
              backgroundColor: '#115293', // 选中状态悬停的背景色
              border: '1px solid transparent',
            },
          },
          marginBottom: 4, // 设置按钮的底部外边距
          '&:hover': {
            border: '1px solid transparent', // 去掉悬停状态的黑边
            backgroundColor: 'lightgray', // 未选中状态悬停的背景色
          },
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            border: '1px solid transparent', // 去掉选中状态的黑边
            backgroundColor: '#1976d2', // 选中状态的背景色
            color: 'white', // 选中状态的文本色
          },
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
});
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
      {
        path: '/dashboard/database',
        element: <Database></Database>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
