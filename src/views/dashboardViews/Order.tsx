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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
} from '@mui/material';
import { getOrdersAPI, getOrderDetailsAPI } from '../../request/api';
//订单
export function Order() {
  const [pages, setPage] = useState({
    pageSize: 8,
    pageNumber: 1,
    total: 0,
  });
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({
    ordersId: '0f180c57-d575-40ca-b69f-4553c7a9816a',
    submitTime: '2024-05-03T17:04:24',
    finishTime: null,
    expectTime: null,
    riderId: null,
    shipName: null,
    phoneNum: null,
    address: null,
    gender: null,
    remark: null,
    orderStatusCode: null,
    riderConfirm: null,
    userConfirm: null,
    startTime: '19:15',
    endTime: '19:30',
    discountValue: null,
    orderItems: [
      {
        saleNum: 2,
        totalMoney: null,
        lastPrice: null,
        commodityName: '商品613',
        pictureUrls:
          'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/e/6/5/e65324be-dd22-4cb0-90dc-91b74c64fd43.png?Expires=4870498134&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=B2UY7L8vkF0FiHcP%2BbfcnGiN4ZY%3D,http://school-life-dev.oss-cn-chengdu.aliyuncs.com/e/6/5/e65324be-dd22-4cb0-90dc-91b74c64fd43.png?Expires=4870498134&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=B2UY7L8vkF0FiHcP%2BbfcnGiN4ZY%3D',
        taste: '口味613',
      },
      {
        saleNum: 2,
        totalMoney: null,
        lastPrice: null,
        commodityName: '商品408',
        pictureUrls:
          'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/e/6/5/e65324be-dd22-4cb0-90dc-91b74c64fd43.png?Expires=4870498134&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=B2UY7L8vkF0FiHcP%2BbfcnGiN4ZY%3D,http://school-life-dev.oss-cn-chengdu.aliyuncs.com/e/6/5/e65324be-dd22-4cb0-90dc-91b74c64fd43.png?Expires=4870498134&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=B2UY7L8vkF0FiHcP%2BbfcnGiN4ZY%3D',
        taste: '口味408',
      },
    ],
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getOrdersAPI({
      pageSize: String(pages.pageSize),
      pageNumber: String(pages.pageNumber),
    }).then((res) => {
      setOrders(res.data.list);
      setPage({
        ...pages,
        total: res.data.total,
      });
    });
  }, [pages.pageNumber]);
  const handleOpen = (ordersId: string) => {
    getOrderDetailsAPI({ orderId: ordersId }).then((res) => {
      setOrder(res.data);
      setOpen(true);
    });
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography>订单</Typography>
      <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
            <TableRow>
              <TableCell>ordersId</TableCell>
              <TableCell>submitTime</TableCell>
              <TableCell>riderId</TableCell>
              <TableCell>shipName</TableCell>
              <TableCell>phoneNum</TableCell>
              <TableCell>address</TableCell>
              <TableCell>orderStatusCode</TableCell>
              <TableCell>操作</TableCell>
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
                <TableCell>{row.submitTime}</TableCell>
                <TableCell>{row.riderId}</TableCell>
                <TableCell>{row.shipName}</TableCell>
                <TableCell>{row.phoneNum}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.orderStatusCode}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleOpen(row.ordersId);
                    }}
                  >
                    详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={1 + Math.round(pages.total / 8)}
        variant="outlined"
        color="primary"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'end',
        }}
        onChange={(e, page) => {
          setPage({
            ...pages,
            pageNumber: page,
          });
          console.log(page);
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>订单详情</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>订单ID:</strong> {order.ordersId}
          </Typography>
          <Typography variant="body1">
            <strong>提交时间:</strong> {order.submitTime}
          </Typography>
          <Typography variant="body1">
            <strong>开始时间:</strong> {order.startTime}
          </Typography>
          <Typography variant="body1">
            <strong>结束时间:</strong> {order.endTime}
          </Typography>
          <Typography variant="body1">
            <strong>订单项:</strong>
          </Typography>
          <List>
            {order.orderItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.commodityName} (x${item.saleNum})`}
                  secondary={`口味: ${item.taste}`}
                />
                <img
                  src={item.pictureUrls.split(',')[0]}
                  alt={item.commodityName}
                  style={{ height: 50, marginLeft: 10 }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
