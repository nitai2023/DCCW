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
} from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import {
  getCommodityAPI,
  getCategoryAPI,
  getCommodityByCategoryAPI,
} from '../../request/api';
export function Commodity() {
  // 查询商品
  const [type, setType] = useState({
    from: 1,
    size: 8,
    mod: 2,
  });
  const [commodity, setCommodity] = useState([]);
  const [category, setCategory] = useState({
    from: 1,
    size: 8,
    category: '',
  });
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCommodity();
  }, [type]);
  useEffect(() => {
    getCommodityByCategoryAPI(category).then((res) => {
      setCommodity(res.data.commodityPreviewVoList);
    });
  }, [category]);
  function getCommodity() {
    getCommodityAPI(type).then((res) => {
      setCommodity(res.data.commodityPreviewVoList);
    });
  }
  useEffect(() => {
    getCategoryAPI().then((res) => {
      setCategoryList(res.data);
      console.log(categoryList);
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
          <TextField
            id="outlined-select-currency"
            select
            label="查询类型"
            style={{ width: '200px' }}
            value={type.mod}
            onChange={(e) => {
              setType({ ...type, mod: Number(e.target.value) });
            }}
          >
            <MenuItem value={1}>价格</MenuItem>
            <MenuItem value={2}>折扣力度</MenuItem>
            <MenuItem value={3}>最新上架</MenuItem>
            <MenuItem value={4}>最热商品</MenuItem>
          </TextField>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel htmlFor="grouped-native-select">目录</InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="目录"
              value={category.category}
              onChange={(e) => {
                setCategory({ ...category, category: e.target.value });
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
        {commodity.map((product) => (
          <Grid item>
            <ProductCard
              title={product.title}
              pictureUrl={product.pictureUrl}
              price={product.price}
              originalPrice={product.originalPrice}
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
          />
        )}
      </div>
    </div>
  );
}
