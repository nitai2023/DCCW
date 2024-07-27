import { Tab, Box, Dialog, DialogContent } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import EChartsReact from 'echarts-for-react';
interface IProfitVo {
  cost: number;
  profit: number;
  profitDivCost: number;
  label: string;
}

interface ICommodityData {
  commodityId: string;
  commodityName: string;
  picture: string;
  cost: number;
  profit: number;
  profitDivCost: number;
  profitVos: IProfitVo[];
}
export function MyEmail() {
  const [value, setValue] = useState('1');
  const [recentData, setRecentData] = useState<IProfitVo[]>([]);
  const [open, setOpen] = useState(false);
  const data = [
    {
      commodityId: '15d7c53c-304e-4f23-8d1f-7568f38451be',
      commodityName: '卫生纸',
      picture:
        'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/9/7/3/973984ac-be00-4e01-8430-4b3289073ffb.png?Expires=4873332941&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=0P9IvVfltn4LrgGsVzGgakyIc68%3D',
      cost: 18.0,
      profit: 17.0,
      profitDivCost: 0.9444444,
      profitVos: [
        {
          cost: 9.0,
          profit: 17.0,
          profitDivCost: 1.8888888,
          label: '2024-06-30',
        },
      ],
    },
    {
      commodityId: '15d7c53c-304e-4f23-8d1f-7568f38451be',
      commodityName: '卫生纸',
      picture:
        'http://school-life-dev.oss-cn-chengdu.aliyuncs.com/9/7/3/973984ac-be00-4e01-8430-4b3289073ffb.png?Expires=4873332941&OSSAccessKeyId=LTAI5tQM5NcbgCPDjtxorDFD&Signature=0P9IvVfltn4LrgGsVzGgakyIc68%3D',
      cost: 19.0,
      profit: 17.0,
      profitDivCost: 0.9444444,
      profitVos: [
        {
          cost: 10.0,
          profit: 17.0,
          profitDivCost: 1.8888888,
          label: '2024-06-30',
        },
      ],
    },
  ];
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleRecentDataChange = (data: IProfitVo[]) => {
    setRecentData(data);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            <EChartsReact
              option={{
                title: {
                  text: '利润分析',
                },
                tooltip: {
                  trigger: 'axis',
                  formatter: function (params: echarts.ECElementEvent) {
                    const idx = params[0].dataIndex; // 获取数据索引
                    const item = data[idx]; // 获取对应的数据项
                    const content = params
                      .map((item) => {
                        return `${item.seriesName}: ${item.value}`;
                      })
                      .join('<br/>');
                    return `<div>
                      <img src="${item.picture}" alt="${item.commodityName}" style="width:50px;height:50px;"/>
                      <br/>${item.commodityName}<br/>${content}
                    </div>`;
                  },
                },
                legend: {
                  data: ['成本', '利润', '利润/成本比'],
                },
                xAxis: {
                  type: 'category',
                  data: data.map((item) => item.commodityName),
                },
                yAxis: {},
                series: [
                  {
                    name: '成本',
                    type: 'bar',
                    data: data.map((item) => item.cost),
                  },
                  {
                    name: '利润',
                    type: 'bar',
                    data: data.map((item) => item.profit),
                  },
                  {
                    name: '利润/成本比',
                    type: 'bar',
                    data: data.map((item) => item.profitDivCost),
                  },
                ],
              }}
              style={{ height: 400, width: '100%' }}
              onEvents={{
                click: (params: echarts.ECElementEvent) => {
                  handleRecentDataChange(data[params.dataIndex].profitVos);
                  setOpen(true);
                },
              }}
            />
            {recentData.length > 0 && (
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                  <EChartsReact
                    option={{
                      title: {
                        text: '最近数据',
                      },
                      legend: {
                        data: ['成本', '利润', '利润/成本比'],
                      },
                      xAxis: {
                        type: 'category',
                        data: recentData.map((item) => item.label),
                      },
                      yAxis: {},
                      series: [
                        {
                          name: '成本',
                          type: 'bar',
                          data: recentData.map((item) => item.cost),
                        },
                        {
                          name: '利润',
                          type: 'bar',
                          data: recentData.map((item) => item.profit),
                        },
                        {
                          name: '利润/成本比',
                          type: 'bar',
                          data: recentData.map((item) => item.profitDivCost),
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%', minWidth: 500 }}
                  ></EChartsReact>
                </DialogContent>
              </Dialog>
            )}
          </Box>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
