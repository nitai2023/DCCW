import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useState } from 'react';
export function Complaints() {
  const [Category, setCategory] = useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom component="div">
        投诉列表
      </Typography>
      <div style={{ display: 'flex', width: '100%' }}>
        <FormControl style={{ width: '200px' }}>
          <InputLabel id="demo-simple-select-label">分类</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Category}
            label="what can I say"
            onChange={handleChange}
          >
            <MenuItem value={10}>骑手配送</MenuItem>
            <MenuItem value={20}>小程序功能</MenuItem>
            <MenuItem value={30}>商品与服装</MenuItem>
            <MenuItem value={40}> 客服</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="error" style={{ width: '100px' }}>
          删除所有
        </Button>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>投诉一号</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>饭太难吃了</Typography>
            <Button variant="contained" color="error">
              删除
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>投诉二号</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>客服素质太低了</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
