import { useEffect } from 'react';
import { getVipListAPI } from '../../request/api';
import {
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
let rows = [
  {
    vipLevelCode: 'VP0001',
    vipLevelName: '塑料vip',
    discountRate: 0.98,
    spendMin: 10.0,
    description: '最垃圾的vip',
    spendMax: 30.0,
  },
  {
    vipLevelCode: 'VP0002',
    vipLevelName: '白银vip',
    discountRate: 0.95,
    spendMin: 30.0,
    description: '一般的vip',
    spendMax: 96.0,
  },
  {
    vipLevelCode: 'VP0003',
    vipLevelName: '黄金vip',
    discountRate: 0.9,
    spendMin: 96.0,
    description: '还可以的vip',
    spendMax: 300.0,
  },
  {
    vipLevelCode: 'VP0004',
    vipLevelName: '铂金vip',
    discountRate: 0.85,
    spendMin: 300.0,
    description: '很强的vip',
    spendMax: 301.0,
  },
];

export function VipCenter() {
  useEffect(() => {
    getVipListAPI().then((res) => {
      rows = res.data;
    });
  });
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          style={{ margin: '10px' }}
        >
          会员中心
        </Typography>
        <div style={{ padding: '10px' }}>
          <TextField></TextField>
          <Button
            variant="contained"
            color="success"
            style={{ height: '56px' }}
          >
            添加
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: '10%' }}>
                vipLevelCode
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                vipLevelName
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                discountRate
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                spendMin
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                spendMax
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                description
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                行为
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.vipLevelCode}
                </TableCell>
                <TableCell align="left">{row.vipLevelName}</TableCell>
                <TableCell align="left">{row.discountRate}</TableCell>
                <TableCell align="left">{row.spendMin}</TableCell>
                <TableCell align="left">{row.spendMax}</TableCell>
                <TableCell align="left">{row.description}</TableCell>

                <TableCell align="left">
                  <Button variant="contained" color="error">
                    删除
                  </Button>
                  <Button variant="contained" color="primary">
                    修改
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
