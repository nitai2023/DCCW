import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  addCouponAPI,
  getCouponListAPI,
  deleteCouponByIdAPI,
} from '../../request/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

//优惠卷
const initialDiscounts = [
  {
    couponId: '',
    discountValue: 19,
    minAmount: 67,
    startTime: '1994-07-13',
    endTime: '1985-12-17',
    limitPerUser: 96,
    stock: 81,
  },
];
export function Voucher() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    discountValue: 0,
    minAmount: 0,
    startTime: '',
    endTime: '',
    limitPerUser: 0,
    stock: 0,
  });
  useEffect(() => {
    getCouponListAPI().then((res) => {
      setDiscounts(res.data);
    });
  }, [update]);
  const handleDelete = (couponId: string) => {
    deleteCouponByIdAPI({ couponId: couponId }).then((res) => {
      setUpdate(!update);
    });
  };
  const handleAddDiscount = () => {
    addCouponAPI({
      ...newDiscount,
      startTime: dayjs(newDiscount.startTime).format('YYYY-MM-DD'),
      endTime: dayjs(newDiscount.endTime).format('YYYY-MM-DD'),
    }).then((res) => {
      console.log(res);
    });
    setNewDiscount({
      discountValue: 0,
      minAmount: 0,
      startTime: '',
      endTime: '',
      limitPerUser: 0,
      stock: 0,
    });
    setUpdate(!update);
    setOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        新增优惠券
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>折扣值</TableCell>
            <TableCell>最小金额</TableCell>
            <TableCell>开始时间</TableCell>
            <TableCell>结束时间</TableCell>
            <TableCell>每用户限制</TableCell>
            <TableCell>库存</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map((discount, index) => (
            <TableRow key={index}>
              <TableCell>{discount.discountValue}</TableCell>
              <TableCell>{discount.minAmount}</TableCell>
              <TableCell>{discount.startTime}</TableCell>
              <TableCell>{discount.endTime}</TableCell>
              <TableCell>{discount.limitPerUser}</TableCell>
              <TableCell>{discount.stock}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(discount.couponId)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新增优惠券</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="折扣值"
            type="number"
            fullWidth
            value={newDiscount.discountValue}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                discountValue: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="最小金额"
            type="number"
            fullWidth
            value={newDiscount.minAmount}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                minAmount: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="开始时间"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newDiscount.startTime}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, startTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="结束时间"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newDiscount.endTime}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, endTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="每用户限制"
            type="number"
            fullWidth
            value={newDiscount.limitPerUser}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                limitPerUser: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="库存"
            type="number"
            fullWidth
            value={newDiscount.stock}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, stock: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            取消
          </Button>
          <Button onClick={handleAddDiscount} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
