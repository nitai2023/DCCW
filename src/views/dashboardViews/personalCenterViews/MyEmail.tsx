import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { userMessagePreviewinfoAPI } from '../../../request/api';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
export function MyEmail() {
  const [Category, setCategory] = useState([]);
  useEffect(() => {
    userMessagePreviewinfoAPI().then((res) => {
      console.log(res.data.announcementVoList);
      setCategory(res.data.announcementVoList);
    });
  }, []);
  const messageItems = Category.map((item) => (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{item.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{item.content}</Typography>
        <Button variant="contained" color="error">
          删除
        </Button>
      </AccordionDetails>
    </Accordion>
  ));
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom component="div">
        我的消息
      </Typography>
      <div>{messageItems}</div>
    </div>
  );
}
