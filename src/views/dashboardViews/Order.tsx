import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
} from '@mui/material';
import { getOrdersAPI } from '../../request/api';
export function Order() {
  const [page, setPage] = useState({
    pageSize: '5',
    pageNumber: '1',
    total: 0,
  });
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrdersAPI({ pageSize: page.pageSize, pageNumber: page.pageNumber }).then(
      (res) => {
        setOrders(res.data.list);
        setPage({
          ...page,
          total: res.data.total,
        });
      }
    );
  }, [page.pageNumber]);
  return (
    <Box sx={{ p: 2 }}>
      <Typography>订单</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'pink' }}>
            <TableRow>
              <TableCell>ordersId</TableCell>
              <TableCell align="right">submitTime</TableCell>
              <TableCell align="right">riderId</TableCell>
              <TableCell align="right">shipName</TableCell>
              <TableCell align="right">phoneNum</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">orderStatusCode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.ordersId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ordersId}
                </TableCell>
                <TableCell align="right">{row.submitTime}</TableCell>
                <TableCell align="right">{row.riderId}</TableCell>
                <TableCell align="right">{row.shipName}</TableCell>
                <TableCell align="right">{row.phoneNum}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.orderStatusCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={1 + Math.round(page.total / 10)}
          variant="outlined"
          color="primary"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'end',
          }}
          onChange={(_, page) => {
            setPage({ ...page, pageNumber: String(page) });
          }}
        />
      </TableContainer>
    </Box>
  );
}
