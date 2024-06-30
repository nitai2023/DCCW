import {
  getSaleSpecificationsAPI,
  getCommodityBatchAPI,
  addSaleSpecificationAPI,
  alterSaleSpecificationsAPI,
  deleteSaleSpecificationByIdAPI,
  alterCommodityBatchAPI,
  deleteCommodityBatchByIdAPI,
  addCommodityBatchAPI,
} from '../request/api';
import {
  getSaleSpecificationsForm,
  alterCommodityBatchForm,
  alterSaleSpecificationsForm,
  addSaleSpecificationForm,
  addCommodityBatchForm,
} from '../request/model';
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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface IData {
  specificationId: string;
  commodityId: string;
  originalPrice: number;
  price: number;
  discount: number;
  unit: string;
  remark: string;
  saleOrRent: boolean;
  sortNum: number;
  isDefault: boolean;
  purchaseLimit: number;
  deleted: boolean;
}
interface IBatchData {
  batchId: string;
  position: string;
  commodityId: string;
  produceTime: string;
  expiredTime: string;
  stock: number;
}
//售卖规格
export function SpecificationDialog({
  commodityId,
}: getSaleSpecificationsForm) {
  const [data, setData] = useState<IData[]>([]);
  const [dialog, setDialog] = useState({
    index: 0,
    edit: false,
    add: false,
  });
  const [editSpecification, setEditSpecification] =
    useState<alterSaleSpecificationsForm | null>(null);
  const [addSpecification, setAddSpecification] =
    useState<addSaleSpecificationForm | null>(null);
  useEffect(() => {
    getSaleSpecificationsAPI({ commodityId: commodityId }).then((res) => {
      setData(res.data);
    });
    setAddSpecification({
      ...addSpecification!,
      commodityId: commodityId,
    });
  }, [dialog.edit, dialog.add]);
  function handleSubmit() {
    if (editSpecification) {
      alterSaleSpecificationsAPI(editSpecification).then(() => {
        setDialog({
          index: 0,
          edit: false,
          add: false,
        });
      });
    }
  }
  function handleAdd() {
    if (addSpecification) {
      addSaleSpecificationAPI(addSpecification).then(() => {
        setDialog({
          index: 0,
          edit: false,
          add: false,
        });
      });
    }
  }
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setDialog({ ...dialog, add: true })}
      >
        添加规格
      </Button>
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
            {data &&
              data.map((row, index) => (
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
                        setEditSpecification(() => ({
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
                        deleteSaleSpecificationByIdAPI({
                          ssId: row.specificationId,
                        });
                        window.location.reload();
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
      <Dialog
        open={dialog.edit}
        onClose={() => {
          setDialog({ ...dialog, edit: false });
        }}
      >
        <DialogTitle>Edit Item</DialogTitle>
        {editSpecification && (
          <>
            <DialogContent>
              <TextField
                margin="dense"
                label="Original Price"
                name="originalPrice"
                type="number"
                fullWidth
                value={editSpecification.originalPrice}
                onChange={(e) => {
                  setEditSpecification({
                    ...editSpecification,
                    originalPrice: Number(e.target.value),
                  });
                }}
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={editSpecification.price}
                onChange={(e) => {
                  setEditSpecification({
                    ...editSpecification,
                    price: Number(e.target.value),
                  });
                }}
              />
              <TextField
                margin="dense"
                label="Unit"
                name="unit"
                fullWidth
                value={editSpecification.unit}
                onChange={(e) => {
                  setEditSpecification({
                    ...editSpecification,
                    unit: e.target.value,
                  });
                }}
              />
              <TextField
                margin="dense"
                label="Remark"
                name="remark"
                fullWidth
                value={editSpecification.remark}
                onChange={(e) => {
                  setEditSpecification({
                    ...editSpecification,
                    remark: e.target.value,
                  });
                }}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="saleOrRent"
                      checked={editSpecification.saleOrRent}
                      onChange={(e) => {
                        setEditSpecification({
                          ...editSpecification,
                          saleOrRent: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Sale or Rent"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isDefault"
                      checked={editSpecification.isDefault}
                      onChange={(e) => {
                        setEditSpecification({
                          ...editSpecification,
                          isDefault: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Default"
                />
              </Box>
              <TextField
                margin="dense"
                label="Purchase Limit"
                name="purchaseLimit"
                type="number"
                fullWidth
                value={editSpecification.purchaseLimit}
                onChange={(e) => {
                  setEditSpecification({
                    ...editSpecification,
                    purchaseLimit: Number(e.target.value),
                  });
                }}
              />
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ ...dialog, edit: false });
            }}
            color="error"
          >
            取消
          </Button>
          <Button
            onClick={() => {
              handleSubmit;
              setDialog({ ...dialog, edit: false });
            }}
            color="primary"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog.add}
        onClose={() => {
          setDialog({ ...dialog, add: false });
        }}
      >
        <DialogTitle>添加规格</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="原价"
            name="originalPrice"
            type="number"
            fullWidth
            onChange={(e) => {
              setAddSpecification({
                ...addSpecification!,
                originalPrice: Number(e.target.value),
              });
            }}
          />
          <TextField
            margin="dense"
            label="价格"
            name="price"
            type="number"
            fullWidth
            onChange={(e) => {
              setAddSpecification({
                ...addSpecification!,
                price: Number(e.target.value),
              });
            }}
          />
          <TextField
            margin="dense"
            label="折扣"
            name="unit"
            fullWidth
            onChange={(e) => {
              setAddSpecification({
                ...addSpecification!,
                unit: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            label="备注"
            name="remark"
            fullWidth
            onChange={(e) => {
              setAddSpecification({
                ...addSpecification!,
                remark: e.target.value,
              });
            }}
          />
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="saleOrRent"
                  onChange={(e) => {
                    setAddSpecification({
                      ...addSpecification!,
                      saleOrRent: e.target.checked,
                    });
                  }}
                />
              }
              label="出售或出租"
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="isDefault"
                  onChange={(e) => {
                    setAddSpecification({
                      ...addSpecification!,
                      isDefault: e.target.checked,
                    });
                  }}
                />
              }
              label="是否默认"
            />
          </Box>
          <TextField
            margin="dense"
            label="购买限制"
            name="purchaseLimit"
            type="number"
            fullWidth
            onChange={(e) => {
              setAddSpecification({
                ...addSpecification!,
                purchaseLimit: Number(e.target.value),
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ ...dialog, add: false });
            }}
            color="error"
          >
            取消
          </Button>
          <Button
            onClick={() => {
              handleAdd;
              setDialog({ ...dialog, add: false });
            }}
            color="primary"
          >
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
//商品批次
export function BatchDialog({ commodityId }: getSaleSpecificationsForm) {
  const [data, setData] = useState<IBatchData[]>([]);
  const [dialog, setDialog] = useState({
    index: 0,
    edit: false,
    add: false,
  });
  const [addBatch, setAddBatch] = useState<addCommodityBatchForm | null>(null);
  const [editBatch, setEditBatch] = useState<alterCommodityBatchForm | null>(
    null
  );
  useEffect(() => {
    getCommodityBatchAPI({ commodityId: commodityId }).then((res) => {
      setData(res.data);
    });
  }, [dialog.edit, dialog.add]);
  function handleSubmit() {
    if (editBatch) {
      alterCommodityBatchAPI(editBatch);
    }
  }
  function handleAdd() {
    if (addBatch) {
      addCommodityBatchAPI(addBatch);
    }
  }
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setDialog({ ...dialog, add: true });
          setAddBatch({
            commodityId: commodityId,
            position: '',
            produceTime: '',
            expiredTime: '',
            stock: 0,
          });
        }}
      >
        添加批次
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>批次ID</TableCell>
              <TableCell>位置</TableCell>
              <TableCell>建立时间</TableCell>
              <TableCell>到期时间</TableCell>
              <TableCell>库存</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.batchId}>
                <TableCell>{row.batchId}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.produceTime}</TableCell>
                <TableCell>{row.expiredTime}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setDialog({ ...dialog, index: index, edit: true });
                      setEditBatch(() => ({
                        commodityBatchId: row.batchId,
                        position: row.position,
                        produceTime: row.produceTime,
                        expiredTime: row.expiredTime,
                        changeStock: row.stock,
                      }));
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      deleteCommodityBatchByIdAPI({
                        commodityBatchId: row.batchId,
                      });
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
      <Dialog
        open={dialog.edit}
        onClose={() => {
          setDialog({ ...dialog, edit: false });
        }}
      >
        <DialogTitle>更改批次</DialogTitle>
        <DialogContent>
          {editBatch && (
            <>
              <TextField
                margin="dense"
                label="位置"
                name="originalPrice"
                type="text"
                fullWidth
                value={editBatch.position}
                onChange={(e) =>
                  setEditBatch({ ...editBatch, position: e.target.value })
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
                value={editBatch.produceTime}
                onChange={(e) =>
                  setEditBatch({ ...editBatch, produceTime: e.target.value })
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
                value={editBatch.expiredTime}
                onChange={(e) =>
                  setEditBatch({ ...editBatch, expiredTime: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={editBatch.changeStock}
                onChange={(e) =>
                  setEditBatch({
                    ...editBatch,
                    changeStock: Number(e.target.value),
                  })
                }
              />
            </>
          )}
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
          <Button
            onClick={() => {
              handleSubmit;
              setDialog({ ...dialog, edit: false });
            }}
            color="primary"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog.add}
        onClose={() => {
          setDialog({ ...dialog, add: false });
        }}
      >
        <DialogTitle>添加批次</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="位置"
            name="originalPrice"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddBatch({ ...addBatch!, position: e.target.value })
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
              setAddBatch({ ...addBatch!, produceTime: e.target.value })
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
            onChange={(e) =>
              setAddBatch({ ...addBatch!, expiredTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="库存"
            name="库存"
            type="number"
            fullWidth
            onChange={(e) =>
              setAddBatch({ ...addBatch!, stock: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog({ ...dialog, add: false });
            }}
            color="error"
          >
            取消
          </Button>
          <Button onClick={handleAdd} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
