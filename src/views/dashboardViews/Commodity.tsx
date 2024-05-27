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
} from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import {
  getCommodityAPI,
  getCategoryAPI,
  getCommodityByCategoryAPI,
} from '../../request/api';
export function Commodity() {
  //查询商品
  const [select, setSelect] = useState({
    from: 1,
    size: 8,
    mod: 1,
    category: '',
    option: true,
  });
  const [commodity, setCommodity] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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
    });
  }
  useEffect(() => {
    getCategoryAPI().then((res) => {
      setCategoryList(res.data);
    });
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom component="div">
          商品列表
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <optgroup label={item.first_category}>
                    {item.secondCategoryVoList.map((secondItem) => (
                      <option value={secondItem.second_category_code}>
                        {secondItem.second_category}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField label="商品名称" style={{ width: '200px' }}></TextField>
          <Button
            variant="contained"
            color="primary"
            style={{ height: '56px', width: '100px', marginRight: '10px' }}
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
        </div>
      </div>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {commodity.map((product, index) => (
          <Grid item key={index}>
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
      <div>
        {commodity.length === 0 ? (
          <div></div>
        ) : (
          <Pagination
            count={10}
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
      </div>
    </div>
  );
}
