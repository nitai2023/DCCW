import { getSaleSpecificationsAPI } from '../request/api';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const initialData = [
  {
    specificationId: 'fce631bb-922e-4f95-a939-b58e96df9bd6',
    commodityId: 'f3f5d2eb-d0ed-446b-b28e-9d5cca28575f',
    originalPrice: 4.0,
    price: 3.0,
    discount: 0.75,
    unit: '1桶',
    remark: '备注0',
    saleOrRent: true,
    sortNum: 1712805122826,
    isDefault: true,
    purchaseLimit: 999999,
    deleted: false,
  },
];

export function DataDialog({ open, handleClose, commodityId }) {
  const [data, setData] = useState(initialData);
  const [dialog, setDialog] = useState({
    index: 0,
    edit: false,
    add: false,
  });
  const [form, setForm] = useState({
    ssId: '',
    originalPrice: 0,
    price: 0,
    unit: '',
    saleOrRent: true,
    isDefault: true,
    purchaseLimit: 0,
    remark: '',
  });
  useEffect(() => {
    getSaleSpecificationsAPI({ commodityId: commodityId }).then((res) => {
      setData(res.data);
    });
  }, []);
  function handleChange() {
    console.log(666);
  }
  function handleSubmit() {
    console.log(555);
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false} fullWidth>
      <DialogTitle>商品规格详情</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>原价</TableCell>
                <TableCell>价格</TableCell>
                <TableCell>折扣</TableCell>
                <TableCell>单位</TableCell>
                <TableCell>备注</TableCell>
                <TableCell>出售或出租</TableCell>
                <TableCell>排序号</TableCell>
                <TableCell>是否默认</TableCell>
                <TableCell>购买限制</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.specificationId}>
                  <TableCell>{row.originalPrice}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.discount}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.remark}</TableCell>
                  <TableCell>{row.saleOrRent ? '是' : '否'}</TableCell>
                  <TableCell>{row.sortNum}</TableCell>
                  <TableCell>{row.isDefault ? '是' : '否'}</TableCell>
                  <TableCell>{row.purchaseLimit}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setDialog({ ...dialog, index: index, edit: true });
                        setForm(() => ({
                          ssId: row.specificationId,
                          originalPrice: row.originalPrice,
                          price: row.price,
                          unit: row.unit,
                          isDefault: row.isDefault,
                          remark: row.remark,
                          saleOrRent: row.saleOrRent,
                          purchaseLimit: row.purchaseLimit,
                        }));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        console.log('删除');
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="success">
          添加
        </Button>
        <Button onClick={handleClose} color="primary">
          关闭
        </Button>
      </DialogActions>
      <Dialog
        open={dialog.edit}
        onClose={() => {
          setDialog({ ...dialog, edit: false });
        }}
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Original Price"
            name="originalPrice"
            type="number"
            fullWidth
            value={form.originalPrice}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Unit"
            name="unit"
            fullWidth
            value={form.unit}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Remark"
            name="remark"
            fullWidth
            value={form.remark}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="saleOrRent"
                checked={form.saleOrRent}
                onChange={handleChange}
              />
            }
            label="Sale or Rent"
          />
          <TextField
            margin="dense"
            label="Sort Number"
            name="sortNum"
            type="number"
            fullWidth
            value={form.sortNum}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
              />
            }
            label="Default"
          />
          <TextField
            margin="dense"
            label="Purchase Limit"
            name="purchaseLimit"
            type="number"
            fullWidth
            value={form.purchaseLimit}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ ...dialog, edit: false });
            }}
            color="error"
          >
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
