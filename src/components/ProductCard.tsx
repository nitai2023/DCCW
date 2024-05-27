import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
} from '@mui/material';
import { deleteCommodityByIdAPI } from '../request/api';
import { Height } from '@mui/icons-material';
export function ProductCard({
  commodityId,
  title,
  pictureUrl,
  price,
  originalPrice,
  discount,
  unit,
}) {
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
          '&:hover': {
            height: '230px',
            transition: '0.5s ',
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
    </Card>
  );
}
