import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Grid,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { getAdvisesAPI, deleteAdviseByIdAPI } from '../../../request/api';
export function Complaints() {
  const [Category, setCategory] = useState('');
  const [data, setData] = useState([]);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  useEffect(() => {
    getAdvisesAPI().then((res) => {
      setData(res.data);
    });
  }, []);
  const deleteAdvise = (adviseId) => {
    deleteAdviseByIdAPI({ adviseId: adviseId });
  };
  return (
    <Box style={{ padding: '20px' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" gutterBottom component="Box">
          投诉列表
        </Typography>
        <Box sx={{ display: 'flex', alignItem: 'center' }}>
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
          <Button variant="contained" color="error" style={{ height: '56px' }}>
            删除所有
          </Button>
        </Box>
      </Box>
      <Box style={{ width: '100%', marginTop: 20 }}>
        {data.map((item, index) => (
          <Accordion key={item.adviseId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>用户建议详情 {index + 1}</Typography>
            </AccordionSummary>{' '}
            <Divider variant="middle" style={{ margin: '20px 0' }} />
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Avatar
                    alt="Advise Image"
                    src={item.adviseImages}
                    style={{ width: 60, height: 60 }}
                    variant="rounded"
                  />
                  <Typography variant="subtitle1">
                    用户名称: {item.adviserName}
                  </Typography>{' '}
                  <Typography variant="subtitle1">
                    性别: {item.gender ? '男' : '女'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    建议内容: {item.adviseContent}
                  </Typography>
                  <Typography variant="subtitle1">
                    联系电话: {item.phoneNum}
                  </Typography>
                  <Typography variant="subtitle1">
                    提交时间: {new Date(item.submitTime).toLocaleString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteAdvise(item.adviseId);
                    }}
                  >
                    删除
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
