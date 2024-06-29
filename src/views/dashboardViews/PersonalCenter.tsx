import { Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
import { getManagerInfoAPI } from '../../request/api';
import { useEffect, useState } from 'react';
interface IAdmin {
  accountId: string;
  nickname: string;
  avatarUrl: string;
  account: string;
  phoneNum: string;
  createTime: string;
  accountTypeCode: string;
}
//个人中心
export function PersonalCenter() {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  useEffect(() => {
    getManagerInfoAPI().then((res) => {
      setAdmin(res.data);
    });
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          borderBlockEnd: '1px solid black',
        }}
      >
        <AccountCircleIcon
          color="success"
          style={{ width: '150px', height: '150px' }}
        />
        <Typography variant="h3" noWrap>
          {admin?.nickname}
        </Typography>
        <Typography
          variant="h6"
          noWrap
          sx={{ marginLeft: '10px', marginRight: '20px' }}
        >
          管理级别:
          {admin?.accountTypeCode !== 'AT0001' ? '普通管理员' : '超级管理员'}
        </Typography>
        <Typography variant="h6" noWrap>
          账号:
          {admin?.account}
        </Typography>
      </Box>
      <Box
        style={{ width: '100%', height: '100%', backgroundColor: '#F1F1F1 ' }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
