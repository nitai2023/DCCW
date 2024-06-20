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

interface SalesData {
  commodityName: string;
  totalSales: number;
}

export function DataAnalysis() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [clothesData, setClothesData] = useState<SalesData[]>([]);
  const [value, setValue] = useState('1');
  const [time, setTime] = useState<string>('day');
  const [granularity, setGranularity] = useState<string>('15min');
  const [graphicType, setGraphicType] = useState('bar');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<SalesData[]>([]);
  const [addressData, setAddressData] = useState<SalesData[]>([]);
  const [consumptionData, setConsumptionData] = useState<SalesData[]>([]);
  const [ordersData, setOrdersData] = useState<SalesData[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleTime = (
    event: React.MouseEvent<HTMLElement>,
    newTime: string | null
  ) => {
    if (newTime !== null) {
      setTime(newTime);
    }
  };

  const handleGraphicType = (
    event: React.MouseEvent<HTMLElement>,
    newGraphicType: string | null
  ) => {
    if (newGraphicType !== null) {
      setGraphicType(newGraphicType);
    }
  };
  const handleGranularity = (
    event: React.MouseEvent<HTMLElement>,
    newGranularity: string | null
  ) => {
    if (newGranularity !== null) {
      setGranularity(newGranularity);
    }
  };
  useEffect(() => {
    setLoading(true);
    getCommodityAnalysisAPI({ graphicType, span: time })
      .then((res) => {
        console.log(graphicType);
        if (res && res.data) {
          setSalesData(res.data);
          setError(null);
        } else {
          setSalesData([]);
          setError('No data found');
        }
      })
      .catch((error) => {
        setSalesData([]);
        setError('Error fetching data');
        console.error('Error fetching sales data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    getClothesAPI({ graphicType, span: time })
      .then((res) => {
        if (res && res.data) {
          setClothesData(res.data);
          setError(null);
        } else {
          setClothesData([]);
          setError('No data found');
        }
      })
      .catch((error) => {
        setSalesData([]);
        setError('Error fetching data');
        console.error('Error fetching sales data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    getUserAPI({ span: time }).then((res) => {
      if (res && res.data) {
        setUserData(res.data);
        setError(null);
      } else {
        setUserData([]);
        setError('No data found');
      }
    });
    getAddressInfoAPI().then((res) => {
      if (res && res.data) {
        setAddressData(res.data);
        setError(null);
      } else {
        setAddressData([]);
        setError('No data found');
      }
    });
    getConsumptionInfoAPI().then((res) => {
      if (res && res.data) {
        setConsumptionData(res.data);
        setError(null);
      } else {
        setConsumptionData([]);
        setError('No data found');
      }
    });
    getOrdersIntervalAPI({ span: time, granularity: granularity }).then(
      (res) => {
        if (res && res.data) {
          setOrdersData(res.data);
          setError(null);
        } else {
          setOrdersData([]);
          setError('No data found');
        }
      }
    );
  }, [graphicType, time, value]);

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
            {salesData ? (
              <Box key={graphicType}>
                {/* 使用 key 属性强制重绘 */}
                <ReactECharts
                  option={
                    graphicType === 'bar'
                      ? {
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
                        }
                      : {
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
                              data: Object.keys(salesData).map((key) => ({
                                value: salesData[Number(key)],
                                name: key,
                              })),
                            },
                          ],
                        }
                  }
                  style={{ height: 400, width: '100%' }}
                />
              </Box>
            ) : (
              <Typography variant="body1">暂无数据</Typography>
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
            {loading ? (
              <Typography>加载中...</Typography>
            ) : error ? (
              <Typography>{error}</Typography>
            ) : (
              <Box key={graphicType}>
                {' '}
                {/* 使用 key 属性强制重绘 */}
                <ReactECharts
                  option={
                    graphicType === 'bar'
                      ? {
                          title: {
                            text: '服装销售数据',
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
                        }
                      : {
                          title: {
                            text: '服装销售数据',
                          },
                          tooltip: {
                            trigger: 'item',
                          },
                          series: [
                            {
                              name: '销售量',
                              type: 'pie',
                              data: Object.keys(clothesData).map((key) => ({
                                value: clothesData[Number(key)],
                                name: key,
                              })),
                            },
                          ],
                        }
                  }
                  style={{ height: 400, width: '100%' }}
                />
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
            {ordersData?.length > 0 && (
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
                    data: ordersData.map((_, index) => index + 1),
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
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
