import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
  Tab,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  deleteCommodityByIdAPI,
  alterCommodityAPI,
  getCommodityInfoAPI,
} from '../request/api';
import { alterCommodityForm } from '../request/model';
import { SpecificationDialog, BatchDialog } from './SaleSpecifications';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//商品卡片
interface ProductCardProps {
  commodityId: string;
  title: string;
  pictureUrl: string;
  price: number;
  originalPrice: number;
  discount: number;
  unit: string;
}
export function ProductCard({
  commodityId,
  title,
  pictureUrl,
  price,
  originalPrice,
  discount,
  unit,
}: ProductCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [value, setValue] = useState('1');
  const [alterCommodity, setAlterCommodity] =
    useState<alterCommodityForm | null>(null);
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    getCommodityInfoAPI({ commodityId: commodityId }).then((res) => {
      setAlterCommodity({
        ...alterCommodity,
        commodityId: res.data.commodityId,
        commodityName: res.data.commodityName,
        secondCategoryCode: res.data.secondCategoryCode,
        title: res.data.title,
        pictureUrls: res.data.pictureUrls,
        brand: res.data.brand,
        taste: res.data.taste,
        weight: res.data.weight,
        minimumThreshold: res.data.minimumThreshold,
      });
    });
  }, []);
  return (
    <Card
      sx={{
        width: '280px',
        height: '280px',
        margin: '10px',
        padding: '0',
      }}
    >
      <CardMedia
        component="img"
        image={pictureUrl}
        alt={title}
        sx={{
          height: '140px',
          transition: '0.5s ',
          '&:hover': {
            height: '230px',
          },
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              价格: {price}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              原价: {originalPrice}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              折扣: {discount}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              单位: {unit}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              详情
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteCommodityByIdAPI({ commodityId: commodityId });
              }}
            >
              删除
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditOpen(true);
              }}
            >
              修改
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={'xl'}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="商品规格" value="1" />
              <Tab label="商品批次" value="2" />
            </TabList>
          </Box>
          <DialogContent sx={{ minHeight: '300px' }}>
            <TabPanel value="1">
              <SpecificationDialog commodityId={commodityId} />
            </TabPanel>
            <TabPanel value="2">
              <BatchDialog commodityId={commodityId} />
            </TabPanel>
          </DialogContent>
        </TabContext>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>修改商品</DialogTitle>
        {alterCommodity && (
          <DialogContent>
            <TextField
              margin="dense"
              label="商品名称"
              name="commodityName"
              type="text"
              fullWidth
              value={alterCommodity.commodityName}
              onChange={(e) =>
                setAlterCommodity({
                  ...alterCommodity!,
                  commodityName: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="标题"
              name="title"
              type="text"
              fullWidth
              value={alterCommodity.title}
              onChange={(e) =>
                setAlterCommodity({ ...alterCommodity!, title: e.target.value })
              }
            />

            <TextField
              margin="dense"
              label="图片地址"
              name="pictureUrls"
              type="text"
              fullWidth
              value={alterCommodity.pictureUrls}
              onChange={(e) =>
                setAlterCommodity({
                  ...alterCommodity!,
                  pictureUrls: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="品牌"
              name="brand"
              type="text"
              fullWidth
              value={alterCommodity.brand}
              onChange={(e) =>
                setAlterCommodity({ ...alterCommodity!, brand: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="味道"
              name="taste"
              type="text"
              fullWidth
              value={alterCommodity.taste}
              onChange={(e) =>
                setAlterCommodity({ ...alterCommodity!, taste: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="重量"
              name="weight"
              type="number"
              fullWidth
              value={alterCommodity.weight}
              onChange={(e) =>
                setAlterCommodity({
                  ...alterCommodity!,
                  weight: Number(e.target.value),
                })
              }
            />
            <TextField
              margin="dense"
              label="商品阈值"
              name="minimumThreshold"
              type="number"
              fullWidth
              value={alterCommodity.minimumThreshold}
              onChange={(e) =>
                setAlterCommodity({
                  ...alterCommodity!,
                  minimumThreshold: Number(e.target.value),
                })
              }
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            color="error"
          >
            取消
          </Button>
          <Button
            onClick={() => alterCommodityAPI(alterCommodity!)}
            color="primary"
          >
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
