import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  getCommodityAnalysisAPI,
  getClothesAPI,
  getUserAPI,
  getAddressInfoAPI,
  getConsumptionInfoAPI,
  getOrdersIntervalAPI,
} from '../../request/api';

interface SalesBarData {
  commodityName: string;
  totalSales: number;
}
interface SalespieData {
  value: number;
  name: string;
}
export function DataAnalysis() {
  const [salesData, setSalesData] = useState<SalesBarData[] | SalespieData[]>(
    []
  );
  const [clothesData, setClothesData] = useState<
    SalesBarData[] | SalespieData[]
  >([]);
  const [value, setValue] = useState('1');
  const [time, setTime] = useState<string>('day');
  const [granularity, setGranularity] = useState<string>('15min');
  const [graphicType, setGraphicType] = useState('bar');
  const [userData, setUserData] = useState<SalesBarData[]>([]);
  const [addressData, setAddressData] = useState([]);
  const [consumptionData, setConsumptionData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleTime = (
    _: React.MouseEvent<HTMLElement>,
    newTime: string | null
  ) => {
    if (newTime !== null) {
      setTime(newTime);
    }
  };

  const handleGraphicType = (
    _: React.MouseEvent<HTMLElement>,
    newGraphicType: string | null
  ) => {
    if (newGraphicType !== null) {
      setGraphicType(newGraphicType);
    }
  };
  const handleGranularity = (
    _: React.MouseEvent<HTMLElement>,
    newGranularity: string | null
  ) => {
    if (newGranularity !== null) {
      setGranularity(newGranularity);
    }
  };
  function convertFormat(data: SalesBarData[] | SalespieData[]) {
    //转换数据格式
    if (graphicType === 'bar') {
      return Object.keys(data).map((key) => ({
        totalSales: data[key].totalSales,
        commodityName: data[key].commodityName,
      }));
    } else {
      return Object.keys(data).map((key) => ({
        value: data[key],
        name: key,
      }));
    }
  }
  useEffect(() => {
    getCommodityAnalysisAPI({ graphicType, span: time }).then((res) => {
      setSalesData(convertFormat(res.data));
    });
    getClothesAPI({ graphicType, span: time }).then((res) => {
      setClothesData(convertFormat(res.data));
    });
    getUserAPI({ span: time }).then((res) => {
      if (res && res.data) {
        setUserData(res.data);
      } else {
        setUserData([]);
      }
    });
    getAddressInfoAPI().then((res) => {
      if (res && res.data) {
        setAddressData(res.data);
        setError(null);
      } else {
        setAddressData([]);
      }
    });
    getConsumptionInfoAPI().then((res) => {
      if (res && res.data) {
        setConsumptionData(res.data);
      } else {
        setConsumptionData([]);
      }
    });
    getOrdersIntervalAPI({ span: time, granularity: granularity }).then(
      (res) => {
        if (res && res.data) {
          setOrdersData(res.data);
        } else {
          setOrdersData([]);
        }
      }
    );
  }, [graphicType, time, value, granularity]);

  return (
    <Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="data analysis tabs">
              <Tab label="商品销售信息" value="1" />
              <Tab label="服装销售信息" value="2" />
              <Tab label="用户人数走势" value="3" />
              <Tab label="地址和消费分布" value="4" />
              <Tab label="订单的下单时间分布" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                aria-label="time span"
              >
                <ToggleButton value="day" aria-label="day">
                  day
                </ToggleButton>
                <ToggleButton value="week" aria-label="week">
                  week
                </ToggleButton>
                <ToggleButton value="month" aria-label="month">
                  month
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={graphicType}
                exclusive
                onChange={handleGraphicType}
                aria-label="graphic type"
              >
                <ToggleButton value="bar" aria-label="bar chart">
                  柱状图
                </ToggleButton>
                <ToggleButton value="pie" aria-label="pie chart">
                  饼图
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {graphicType == 'bar' ? (
              <Box>
                {salesData && (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {},
                      legend: {
                        data: ['销售量'],
                      },
                      xAxis: {
                        data: salesData.map((item) => item.commodityName),
                      },
                      yAxis: {},
                      series: [
                        {
                          name: '销售量',
                          type: 'bar',
                          data: salesData.map((item) => item.totalSales),
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%' }}
                  />
                )}
              </Box>
            ) : (
              <Box>
                {salesData && (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {
                        trigger: 'item',
                      },
                      series: [
                        {
                          name: '销售量',
                          type: 'pie',
                          data: salesData,
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%' }}
                  />
                )}
              </Box>
            )}
          </TabPanel>
          <TabPanel value="2">
            <Box>
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                aria-label="time span"
              >
                <ToggleButton value="day" aria-label="day">
                  day
                </ToggleButton>
                <ToggleButton value="week" aria-label="week">
                  week
                </ToggleButton>
                <ToggleButton value="month" aria-label="month">
                  month
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={graphicType}
                exclusive
                onChange={handleGraphicType}
                aria-label="graphic type"
              >
                <ToggleButton value="bar" aria-label="bar chart">
                  柱状图
                </ToggleButton>
                <ToggleButton value="pie" aria-label="pie chart">
                  饼图
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {graphicType == 'bar' ? (
              <Box>
                {salesData && (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {},
                      legend: {
                        data: ['销售量'],
                      },
                      xAxis: {
                        data: clothesData.map((item) => item.commodityName),
                      },
                      yAxis: {},
                      series: [
                        {
                          name: '销售量',
                          type: 'bar',
                          data: clothesData.map((item) => item.totalSales),
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%' }}
                  />
                )}
              </Box>
            ) : (
              <Box>
                {salesData && (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {
                        trigger: 'item',
                      },
                      series: [
                        {
                          name: '销售量',
                          type: 'pie',
                          data: clothesData,
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%' }}
                  />
                )}
              </Box>
            )}
          </TabPanel>
          <TabPanel value="3">
            <ToggleButtonGroup
              value={time}
              exclusive
              onChange={handleTime}
              aria-label="time span"
            >
              <ToggleButton value="day" aria-label="day">
                day
              </ToggleButton>
              <ToggleButton value="week" aria-label="week">
                week
              </ToggleButton>
              <ToggleButton value="month" aria-label="month">
                month
              </ToggleButton>
            </ToggleButtonGroup>
            <ReactECharts
              option={{
                title: {
                  text: '数据折线图',
                },
                tooltip: {
                  trigger: 'axis',
                },
                xAxis: {
                  type: 'category',
                  data: userData.map((_, index) => index + 1),
                  name: '天数',
                },
                yAxis: {
                  type: 'value',
                  name: '数值',
                },
                series: [
                  {
                    name: '数值',
                    type: 'line',
                    data: userData,
                    smooth: true,
                  },
                ],
              }}
              style={{ height: 400, width: '100%' }}
            />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ReactECharts
              option={{
                title: {
                  text: '地址分布情况',
                },
                tooltip: {
                  trigger: 'item',
                },
                series: [
                  {
                    name: '销售量',
                    type: 'pie',
                    data: Object.keys(addressData).map((key) => ({
                      value: addressData[Number(key)],
                      name: key,
                    })),
                  },
                ],
              }}
              style={{ height: 400, width: '50%' }}
            />
            <ReactECharts
              option={{
                title: {
                  text: '消费分布情况',
                },
                tooltip: {
                  trigger: 'item',
                },
                series: [
                  {
                    name: '销售量',
                    type: 'pie',
                    data: Object.keys(consumptionData).map((key) => ({
                      value: consumptionData[Number(key)],
                      name: key,
                    })),
                  },
                ],
              }}
              style={{ height: 400, width: '50%' }}
            />
          </TabPanel>
          <TabPanel value="5">
            <ToggleButtonGroup
              value={time}
              exclusive
              onChange={handleTime}
              aria-label="time span"
            >
              <ToggleButton value="day" aria-label="day">
                day
              </ToggleButton>
              <ToggleButton value="week" aria-label="week">
                week
              </ToggleButton>
              <ToggleButton value="month" aria-label="month">
                month
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={granularity}
              exclusive
              onChange={handleGranularity}
              aria-label="time span"
            >
              <ToggleButton value="15min" aria-label="day">
                15min
              </ToggleButton>
              <ToggleButton value="1h" aria-label="week">
                1h
              </ToggleButton>
              <ToggleButton value="3h" aria-label="month">
                3h
              </ToggleButton>
            </ToggleButtonGroup>
            {ordersData ? (
              <ReactECharts
                option={{
                  title: {
                    text: '订单的下单时间分布情况',
                  },
                  tooltip: {
                    trigger: 'item',
                  },
                  series: [
                    {
                      name: '销售量',
                      type: 'pie',
                      data: Object.keys(ordersData).map((key) => ({
                        value: ordersData[Number(key)],
                        name: key,
                      })),
                    },
                  ],
                }}
                style={{ height: 400, width: '50%' }}
              />
            ) : (
              <>暂无数据</>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
