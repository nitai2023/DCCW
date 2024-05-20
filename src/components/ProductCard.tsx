import { Card, CardContent, Typography, CardMedia } from '@mui/material';
export function ProductCard({ title, pictureUrl, price, originalPrice, unit }) {
  return (
    <Card
      style={{ width: '200px', height: '250px', margin: '10px', padding: '0' }}
    >
      <CardMedia component="img" height="140" image={pictureUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price} USD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Original Price: {originalPrice} USD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unit: {unit}
        </Typography>
      </CardContent>
    </Card>
  );
}
