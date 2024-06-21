import { useState } from 'react';
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
} from '@mui/material';
import { deleteCommodityByIdAPI } from '../request/api';
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
                console.log(commodityId);
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
    </Card>
  );
}
