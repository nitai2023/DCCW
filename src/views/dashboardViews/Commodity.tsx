import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Pagination,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  Box,
  Badge,
  Dialog,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Autocomplete,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import parse from 'html-react-parser';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUpload from '../../components/ImageUpload';
import {
  getCommodityAPI,
  getCategoryAPI,
  getCommodityByCategoryAPI,
  searchCommoditiesAPI,
  getExpiredBatchAPI,
  getExpiringBatchAPI,
  removeExpiredBatchAPI,
  removeExpiringBatchAPI,
  getSearchKeyWordsAPI,
  getManagerInfoAPI,
  publishCommodityAPI,
  getStockShortAPI,
} from '../../request/api';
import { publishCommodityForm } from '../../request/model';
//商品
interface IAdminInfo {
  accountId: string;
  nickname: string;
  avatarUrl: string;
  account: string;
  phoneNum: string;
  createTime: string;
  accountTypeCode: string;
}
interface ICommodity {
  commodityId: string;
  monthSales: number;
  title: string;
  score: number;
  pictureUrl: string;
  deleted: boolean;
  originalPrice: number;
  discount: number;
  price: number;
  unit: string;
  purchaseLimit: number | null;
}
interface ISecondCategory {
  secondCategoryCode: string;
  secondCategory: string;
}
interface ICategoryList {
  firstCategoryCode: string;
  firstCategory: string;
  pic: string;
  secondCategoryVoList: ISecondCategory[];
}
interface IExpiredBatch {
  managerId: string;
  commodityId: string;
  batchId: string;
  commodityName: string;
  position: string;
  timeLeft: string;
}
interface IExpiringBatch {
  managerId: string;
  commodityId: string;
  batchId: string;
  commodityName: string;
  position: string;
  timeLeft: string;
}
interface IStockShort {
  commodityName: string;
  commodityId: string;
  position1: null;
  position2: null;
  stock: number;
}
export function Commodity() {
  //查询商品
  const [adminInfo, setAdminInfo] = useState<IAdminInfo | null>(null);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [addCommodity, setAddCommodity] = useState<publishCommodityForm | null>(
    null
  );
  const [value, setValue] = useState<string>('1');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [select, setSelect] = useState({
    from: 1,
    size: 8,
    mod: 1,
    category: '',
    option: true,
    total: 0,
    SearchKeyWord: '',
  });
  const [warnDialog, setWarnDialog] = useState<boolean>(false);
  const [commodity, setCommodity] = useState<ICommodity[]>([]);
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);
  const [expiringBatch, setExpiringBatch] = useState<IExpiringBatch[]>([]);
  const [expiredBatch, setExpiredBatch] = useState<IExpiredBatch[]>([]);
  const [stockShort, setStockShort] = useState<IStockShort[]>([]);
  const [warnTotal, setWarnTotal] = useState<number>(0);
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    getExpiringBatchAPI().then((res) => {
      setExpiringBatch(res.data);
      setWarnTotal(res.data.length);
    });
    getExpiredBatchAPI().then((res) => {
      setExpiredBatch(res.data);
      setWarnTotal(res.data.length + warnTotal);
    });
    getManagerInfoAPI().then((res) => {
      setAdminInfo(res.data);
    });
    getStockShortAPI().then((res) => {
      setWarnTotal(res.data.length + warnTotal);
      setStockShort(res.data);
    });
  }, []);
  useEffect(() => {
    if (select.SearchKeyWord) {
      getSearchKeyWordsAPI({ searchKeyword: select.SearchKeyWord }).then(
        (res) => {
          setSuggestions(res.data);
        }
      );
    }
  }, [select.SearchKeyWord]);
  useEffect(() => {
    if (select.option) {
      //分类查询商品
      getCommodity();
    } else {
      //通过目录查询商品
      getCommodityByCategoryAPI({
        from: select.from,
        size: select.size,
        category: select.category,
      }).then((res) => {
        setCommodity(res.data.commodityPreviewVoList);
        setSelect({
          ...select,
          total: res.data.total,
        });
      });
    }
  }, [select.mod, select.from, select.size, select.category, select.option]);
  function getCommodity() {
    getCommodityAPI({
      from: select.from,
      size: select.size,
      mod: select.mod,
    }).then((res) => {
      setCommodity(res.data.commodityPreviewVoList);
      setSelect({
        ...select,
        total: res.data.total,
      });
    });
  }
  useEffect(() => {
    getCategoryAPI().then((res) => {
      setCategoryList(res.data);
    });
  }, []);
  function handleAdd() {
    if (addCommodity) {
      publishCommodityAPI(addCommodity).then(() => {
        setAddCommodity(null);
      });
    }
  }
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          商品列表
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {adminInfo && adminInfo.accountTypeCode == 'AT0002' ? (
            <Badge
              badgeContent={warnTotal}
              color="error"
              sx={{ mr: 3 }}
              onClick={() => setWarnDialog(true)}
            >
              <ShoppingCartIcon color="primary" />
            </Badge>
          ) : null}
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                value={select.option}
                onChange={(e) =>
                  setSelect({ ...select, option: e.target.checked })
                }
              />
            }
            label={select.option ? '类型查询' : '目录查询'}
          />
          {select.option ? (
            <TextField
              id="outlined-select-currency"
              select
              label="查询类型"
              style={{ width: '200px' }}
              value={select.mod}
              onChange={(e) => {
                setSelect({ ...select, mod: Number(e.target.value) });
              }}
            >
              <MenuItem value={1}>价格</MenuItem>
              <MenuItem value={2}>折扣力度</MenuItem>
              <MenuItem value={3}>最新上架</MenuItem>
              <MenuItem value={4}>最热商品</MenuItem>
            </TextField>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel htmlFor="grouped-native-select">目录</InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                label="目录"
                value={select.category}
                onChange={(e) => {
                  setSelect({ ...select, category: e.target.value });
                }}
              >
                <option aria-label="None" value="" />
                {categoryList.map((item) => (
                  <optgroup label={item.firstCategory}>
                    {item.secondCategoryVoList.map((secondItem) => (
                      <option value={secondItem.secondCategoryCode}>
                        {secondItem.secondCategory}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          )}
          <Autocomplete
            options={suggestions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="商品名称"
                style={{ width: '200px' }}
                value={select.SearchKeyWord}
                onChange={(e) => {
                  setSelect({ ...select, SearchKeyWord: e.target.value });
                }}
              ></TextField>
            )}
            renderOption={(props, option) => (
              <li {...props}>{parse(option)}</li>
            )}
            getOptionLabel={(option) => option.replace(/<[^>]+>/g, '')}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ height: '56px', width: '100px', marginRight: '10px' }}
            onClick={() => {
              searchCommoditiesAPI({
                from: select.from,
                size: select.size,
                searchKeyWord: select.SearchKeyWord,
              }).then((res) => {
                console.log(res);
                setCommodity(res.data.commodityVoList);
              });
            }}
          >
            查询
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{ height: '56px', width: '130px' }}
            startIcon={<AddIcon />}
            onClick={() => {
              setAddDialog(true);
            }}
          >
            添加商品
          </Button>
        </Box>
      </Box>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', marginLeft: '0', marginTop: '-10px' }}
      >
        {commodity.map((product, index) => (
          <Grid item key={index} spacing={4}>
            <ProductCard
              commodityId={product.commodityId}
              title={product.title}
              pictureUrl={product.pictureUrl}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              unit={product.unit}
            />
          </Grid>
        ))}
      </Grid>
      <Box>
        {commodity.length === 0 ? (
          <Box></Box>
        ) : (
          <Pagination
            count={Math.ceil(select.total / 8)}
            variant="outlined"
            color="primary"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            onChange={(_, page) => {
              setSelect({ ...select, from: (page - 1) * 8 + 1 });
            }}
          />
        )}
      </Box>
      {adminInfo && adminInfo.accountTypeCode == 'AT0002' ? (
        <Dialog
          open={warnDialog}
          onClose={() => setWarnDialog(false)}
          fullWidth
          maxWidth={'xl'}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="即将过期商品" value="1" />
                <Tab label="已经过期商品" value="2" />
                <Tab label="库存较少商品" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>批次ID</TableCell>
                      <TableCell>位置</TableCell>
                      <TableCell>商品名称</TableCell>
                      <TableCell>到期剩余时间</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expiredBatch &&
                      expiringBatch.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.managerId}</TableCell>
                          <TableCell>{row.position}</TableCell>
                          <TableCell>{row.commodityName}</TableCell>
                          <TableCell>{row.timeLeft}</TableCell>
                          <TableCell
                            onClick={() => {
                              removeExpiringBatchAPI({ batchId: row.batchId });
                            }}
                          >
                            <IconButton color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value="2">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>批次ID</TableCell>
                      <TableCell>位置</TableCell>
                      <TableCell>商品名称</TableCell>
                      <TableCell>已过期时间</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expiredBatch &&
                      expiredBatch.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.managerId}</TableCell>
                          <TableCell>{row.position}</TableCell>
                          <TableCell>{row.commodityName}</TableCell>
                          <TableCell>{row.timeLeft}</TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              onClick={() => {
                                removeExpiredBatchAPI({ batchId: row.batchId });
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
            </TabPanel>
            <TabPanel value="3">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>商品名称</TableCell>
                      <TableCell>位置1</TableCell>
                      <TableCell>位置2</TableCell>
                      <TableCell>库存</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockShort &&
                      stockShort.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.commodityName}</TableCell>
                          <TableCell>{row.position1}</TableCell>
                          <TableCell>{row.position2}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Dialog>
      ) : (
        <></>
      )}
      <Dialog open={addDialog} onClose={setAddDialog}>
        <DialogTitle>添加商品</DialogTitle>
        <DialogContent>
          <FileUpload
            onUploadSuccess={(url: string) =>
              setAddCommodity({
                ...addCommodity!,
                pictureUrls: url,
              })
            }
          ></FileUpload>
          <TextField
            margin="dense"
            label="商品名称"
            name="originalPrice"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({
                ...addCommodity!,
                commodityName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="二级目录"
            name="originalPrice"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({
                ...addCommodity!,
                secondCategoryCode: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="标题"
            name="originalPrice"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({ ...addCommodity!, title: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="品牌"
            name="price"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({ ...addCommodity!, brand: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="味道"
            name="price"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({ ...addCommodity!, taste: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="重量"
            name="price"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({
                ...addCommodity!,
                weight: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="最低阈值"
            name="price"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddCommodity({
                ...addCommodity!,
                minimumThreshold: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialog(false);
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
