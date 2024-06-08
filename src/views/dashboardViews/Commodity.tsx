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
} from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  getCommodityAPI,
  getCategoryAPI,
  getCommodityByCategoryAPI,
  searchCommoditiesAPI,
  getExpiredBatchAPI,
  getExpiringBatchAPI,
  removeExpiredBatchAPI,
  removeExpiringBatchAPI,
} from '../../request/api';
//商品
export function Commodity() {
  //查询商品
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [select, setSelect] = useState({
    from: 1,
    size: 8,
    mod: 1,
    category: '',
    option: true,
    total: 0,
    SearchKeyWord: '',
  });
  const [warnDialog, setWarnDialog] = useState(false);
  const [commodity, setCommodity] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [expiringBatch, setExpiringBatch] = useState([]);
  const [expiredBatch, setExpiredBatch] = useState([]);
  const [warnTotal, setWarnTotal] = useState(0);
  useEffect(() => {
    getExpiringBatchAPI().then((res) => {
      setExpiringBatch(res.data);
      setWarnTotal(res.data.length);
    });
    getExpiredBatchAPI().then((res) => {
      setExpiredBatch(res.data);
      setWarnTotal(res.data.length + warnTotal);
    });
  }, []);
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
          <Badge
            badgeContent={warnTotal}
            color="error"
            sx={{ mr: 3 }}
            onClick={() => setWarnDialog(true)}
          >
            <ShoppingCartIcon color="primary" />
          </Badge>

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

          <TextField
            label="商品名称"
            style={{ width: '200px' }}
            value={select.SearchKeyWord}
            onChange={(e) => {
              setSelect({ ...select, SearchKeyWord: e.target.value });
            }}
          ></TextField>
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
            style={{ height: '56px', width: '100px' }}
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
            onChange={(e, page) => {
              setSelect({ ...select, from: (page - 1) * 8 + 1 });
            }}
          />
        )}
      </Box>
      <Dialog
        open={warnDialog}
        onClose={() => setWarnDialog(false)}
        fullWidth
        maxWidth={'xl'}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="即将过期商品" value="1" />
              <Tab label="已经过期商品" value="2" />
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
                  {expiringBatch.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.managerId}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.commodityName}</TableCell>
                      <TableCell>{row.timeLeft}</TableCell>
                      <TableCell
                        onClick={() => {
                          removeExpiringBatchAPI(row.batchId);
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
            {' '}
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
                  {expiredBatch.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.managerId}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.commodityName}</TableCell>
                      <TableCell>{row.timeLeft}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => {
                            removeExpiredBatchAPI(row.batchId);
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
        </TabContext>
      </Dialog>
    </Box>
  );
}
