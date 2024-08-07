import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ImageList,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  ImageListItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NoData } from '../../../components/NoData';
import { useEffect, useState } from 'react';
import {
  getAdvisesAPI,
  deleteAdviseByIdAPI,
  getDictAPI,
  deleteAllAdvisesAPI,
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
  const [updata, setUpdata] = useState(false);
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
  }, [updata]);
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
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid black',
        }}
      >
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
          <Button
            variant="contained"
            color="error"
            style={{ height: '56px' }}
            onClick={() => {
              deleteAllAdvisesAPI();
              setUpdata(!updata);
            }}
          >
            删除所有
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          width: '100%',
          marginTop: 20,
          maxHeight: '900px',
        }}
      >
        {data ? (
          data.map((item, index) => (
            <Accordion key={item.adviseId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                }}
              >
                <Typography variant="h5">{item.adviserName}的建议</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteAdvise(item.adviseId);
                    setUpdata(!updata);
                  }}
                  sx={{ marginRight: '20px' }}
                >
                  删除
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="subtitle1">
                      用户名称: {item.adviserName}
                    </Typography>
                    <Typography variant="subtitle1">
                      性别: {item.gender ? '男' : '女'}
                    </Typography>
                    <Typography variant="subtitle1">
                      联系电话: {item.phoneNum}
                    </Typography>
                    <Typography variant="subtitle1">
                      提交时间: {new Date(item.submitTime).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <ImageList cols={item.adviseImages.split(',').length}>
                      {item.adviseImages.split(',').map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            alt="Advise Image"
                            src={image.trim()}
                            key={index}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    {/* <Grid item xs={12} sm={6} md={4} spacing={2} container>
                      {item.adviseImages.split(',').map((image, index) => (
                        <>
                          <Grid
                            xs={4}
                            style={{ width: 100, height: 100 }}
                          ></Grid>
                          <Grid xs={4} style={{ width: 100, height: 100 }}>
                            <img
                              alt="Advise Image"
                              src={image.trim()}
                              key={index}
                            />
                          </Grid>
                        </>
                      ))}
                    </Grid> */}
                  </Grid>

                  <Grid item xs>
                    <Typography gutterBottom>建议内容:</Typography>
                    <Typography
                      border={0.5}
                      p={1}
                      borderRadius={1}
                      minHeight={50}
                    >
                      {item.adviseContent}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <NoData></NoData>
        )}
      </Box>
    </Box>
  );
}
