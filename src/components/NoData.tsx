import { Typography, Box } from '@mui/material';
export function NoData() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        fontSize: '24px',
        color: '#999',
      }}
    >
      <Typography variant="h4">暂无数据</Typography>
    </Box>
  );
}
