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
  SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import {
  getAdvisesAPI,
  deleteAdviseByIdAPI,
  getDictAPI,
} from '../../../request/api';
interface IData {
  adviseId: string;
  adviseContent: string;
  adviseImages: string;
  adviseStatusCode1: string;
  adviseStatus1: string;
  adviseStatusCode2: string;
  adviseStatus2: string;
  adviseStatusCode3: string;
  adviseStatus3: string;
  submitTime: string;
  adviserName: string;
  gender: boolean;
  phoneNum: string;
}
interface IDict {
  adviseTypeCode: string;
  adviseType: string;
}

export function Complaints() {
  const [Category, setCategory] = useState('');
  const [dict, setDict] = useState<IDict[]>([]);
  const [data, setData] = useState<IData[]>([]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
  };
  useEffect(() => {
    getAdvisesAPI({}).then((res) => {
      setData(res.data);
    });
    getDictAPI({ dictKey: 'dict:AdviseType' }).then((res) => {
      setDict(res.data);
    });
  }, []);
  useEffect(() => {
    getAdvisesAPI({ adviseStatusCode: Category }).then((res) => {
      setData(res.data);
    });
  }, [Category]);
  const deleteAdvise = (adviseId: string) => {
    deleteAdviseByIdAPI({ adviseId: adviseId });
  };
  return (
    <Box style={{ padding: '20px' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" gutterBottom>
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
              {dict.map((item) => (
                <MenuItem value={item.adviseTypeCode}>
                  {item.adviseType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="error" style={{ height: '56px' }}>
            删除所有
          </Button>
        </Box>
      </Box>
      <Box style={{ width: '100%', marginTop: 20 }}>
        {data ? (
          data.map((item, index) => (
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
          ))
        ) : (
          <Box>无数据</Box>
        )}
      </Box>
    </Box>
  );
}
