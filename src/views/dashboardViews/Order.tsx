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
interface IOrderItems {
  saleNum: number;
  totalMoney: number;
  lastPrice: number;
  commodityName: string;
  pictureUrls: string;
  taste: string;
}
interface IOrder {
  ordersId: string;
  submitTime: string;
  finishTime: string;
  expectTime: string;
  riderId: string;
  shipName: string;
  phoneNum: string;
  address: string;
  gender: string;
  remark: string;
  orderStatusCode: string;
  riderConfirm: string;
  userConfirm: string;
  startTime: string;
  endTime: string;
  discountValue: string;
  orderItems: IOrderItems[];
}
interface IOrders {
  ordersId: string;
  submitTime: string;
  finishTime: string;
  expectTime: string;
  riderId: string;
  shipName: string;
  phoneNum: string;
  address: string;
  remark: string;
  orderStatusCode: string;
}
export function Order() {
  const [pages, setPage] = useState({
    pageSize: 8,
    pageNumber: 0,
    total: 0,
  });
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [open, setOpen] = useState<boolean>(false);
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
      <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
            <TableRow>
              <TableCell>订单ID</TableCell>
              <TableCell>建立时间</TableCell>
              <TableCell>骑手ID</TableCell>
              <TableCell>收货人</TableCell>
              <TableCell>电话</TableCell>
              <TableCell>地址</TableCell>
              <TableCell>订单状态</TableCell>
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
        onChange={(_, page) => {
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
        {order && (
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
        )}

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
