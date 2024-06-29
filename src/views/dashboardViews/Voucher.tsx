import { useEffect, useState } from 'react';
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDeletev from '../../components/Confirm';
//优惠卷
interface IDiscounts {
  couponId: string;
  discountValue: number;
  minAmount: number;
  startTime: string;
  endTime: string;
  limitPerUser: number;
  stock: number;
}
interface INewDiscount {
  discountValue: number;
  minAmount: number;
  startTime: string | '2000-01-01';
  endTime: string | '2100-01-01';
  limitPerUser: number | null;
  stock: number | null;
}
export function Voucher() {
  const [discounts, setDiscounts] = useState<IDiscounts[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [newDiscount, setNewDiscount] = useState<INewDiscount | null>(null);
  useEffect(() => {
    getCouponListAPI().then((res) => {
      setDiscounts(res.data);
    });
  }, [update]);
  const handleDelete = (couponId: string) => {
    deleteCouponByIdAPI({ couponId: couponId }).then(() => {
      setUpdate(!update);
    });
  };
  const handleAddDiscount = () => {
    addCouponAPI(newDiscount!).then(() => {
      setUpdate(!update);
      setNewDiscount(null);
      setOpen(false);
      setOpen(false);
    });
  };
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayDate = getTodayDate();
  return (
    <Box sx={{ p: 2 }}>
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
            {discounts ? (
              discounts!.map((discount, index) => (
                <TableRow key={index}>
                  <TableCell>{discount.discountValue}</TableCell>
                  <TableCell>{discount.minAmount}</TableCell>
                  <TableCell>{discount.startTime}</TableCell>
                  <TableCell>{discount.endTime}</TableCell>
                  <TableCell>{discount.limitPerUser}</TableCell>
                  <TableCell>{discount.stock}</TableCell>
                  <TableCell>
                    <ConfirmDeletev
                      onDelete={() => handleDelete(discount.couponId)}
                    ></ConfirmDeletev>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
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
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount!,
                  discountValue: Number(e.target.value),
                })
              }
            />
            <TextField
              margin="dense"
              label="最小金额"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount!,
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
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount!,
                  startTime: e.target.value,
                })
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
              inputProps={{
                min: todayDate,
              }}
              onChange={(e) =>
                setNewDiscount({ ...newDiscount!, endTime: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="每用户限制"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount!,
                  limitPerUser: Number(e.target.value),
                })
              }
            />
            <TextField
              margin="dense"
              label="库存"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount!,
                  stock: Number(e.target.value),
                })
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
    </Box>
  );
}
