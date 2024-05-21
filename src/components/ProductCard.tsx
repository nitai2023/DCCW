import { Card, CardContent, Typography, CardMedia } from '@mui/material';
export function ProductCard({ title, pictureUrl, price, originalPrice, unit }) {
  return (
    <Card
      style={{ width: '300px', height: '280px', margin: '10px', padding: '0' }}
    >
      <CardMedia
        component="img"
        height="140"
        width="140"
        image={pictureUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          价格: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          原价: {originalPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          单位: {unit}
        </Typography>
      </CardContent>
    </Card>
  );
}
