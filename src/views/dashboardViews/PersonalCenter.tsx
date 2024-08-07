import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';

//个人中心
export function PersonalCenter() {
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
        style={{ width: '100%', height: '100%', backgroundColor: '#F1F1F1 ' }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
