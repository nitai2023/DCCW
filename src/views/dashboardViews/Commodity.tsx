import { useState } from 'react';
import { Typography, TextField, MenuItem, Button, Grid } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { getCommodityAPI } from '../../request/api';
export function Commodity() {
  // 查询商品
  const [select, setSelect] = useState({
    from: 1,
    size: 10,
    mod: 2,
  });
  const [commodity, setCommodity] = useState([
    {
      commodityId: '4f3825b8-ad93-4a0b-8847-ce56651dd2d8',
      monthSales: 0,
      title: '标题667',
      score: 0.0,
      pictureUrl:
        'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/b/2/9/b293a019-6242-4175-a2a4-3291244ac02d.jpg?Expires=4867032237&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=O13RLKiySImSBsoIB8nUYZswjhA%3D',
      deleted: false,
      originalPrice: 4.0,
      discount: 0.75,
      price: 3.0,
      unit: '1桶',
      purchaseLimit: null,
    },
    {
      commodityId: '56798402-4de9-469a-a745-89cc94e80e1d',
      monthSales: 0,
      title: '标题856',
      score: 0.0,
      pictureUrl:
        'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/b/2/9/b293a019-6242-4175-a2a4-3291244ac02d.jpg?Expires=4867032237&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=O13RLKiySImSBsoIB8nUYZswjhA%3D',
      deleted: false,
      originalPrice: 4.0,
      discount: 0.75,
      price: 3.0,
      unit: '1桶',
      purchaseLimit: null,
    },
  ]);
  function getCommodity() {
    getCommodityAPI(select).then((res) => {
      setCommodity(res.data.commodityPreviewVoList);
      console.log(res.data.commodityPreviewVoList);
    });
  }
  return (
    <div>
      <Typography variant="h3" gutterBottom component="div">
        商品列表
      </Typography>
      <div>
        <TextField
          id="outlined-number"
          label="从第几个开始查询"
          type="number"
          value={select.from}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setSelect({ ...select, from: Number(e.target.value) });
          }}
        />
        <TextField
          id="outlined-number"
          label="一页查几个"
          type="number"
          value={select.size}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setSelect({ ...select, size: Number(e.target.value) });
          }}
        />
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
        <Button
          variant="contained"
          color="success"
          style={{ height: '56px', width: '100px' }}
          onClick={getCommodity}
        >
          查询
        </Button>
      </div>
      <Grid container spacing={5}>
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
    </div>
  );
}
