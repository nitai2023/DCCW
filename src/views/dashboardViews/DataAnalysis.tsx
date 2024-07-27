import React, { useState, useEffect } from 'react';
import { NoData } from '../../components/NoData';
import {
  Box,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Button,
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
  getProfitAPI,
  getAllowTimeSlotAPI,
  getTotalSaleAndTotalSaleNumAPI,
  getTotalSaleAndTotalSaleNumPerCommodityAPI,
  getInventoryTurnoverAPI,
  getUserCompositionAPI,
} from '../../request/api';
import {
  getProfitForm,
  getTotalSaleAndTotalSaleNumForm,
  getUserCompositionForm,
} from '../../request/model';
interface SalesBarData {
  commodityName: string;
  totalSales: number;
}
interface SalespieData {
  value: number;
  name: string;
}
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
interface ITotalSaleData {
  totalSale: number;
  totalSaleNum: number;
  label: string;
}
interface IPerCommoditySaleData {
  commodityId: string;
  commodityName: string;
  picture: string;
  totalSaleNum: number;
  totalSale: number;
  totalSalePerCommodityVos: ITotalSaleData[];
}
interface IInventoryTurnoverVosData {
  inventoryTurnover: number;
  label: string;
}
interface IInventoryTurnoverData {
  commodityId: string;
  commodityImg: string;
  commodityName: string;
  inventoryTurnover: number;
  inventoryTurnoverVos: IInventoryTurnoverVosData[];
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
  const [recentData, setRecentData] = useState<IProfitVo[]>([]);
  const [open, setOpen] = useState(false);
  const [profitData, setProfitData] = useState<ICommodityData[]>([]);
  const [profitSelect, setProfitSelect] = useState<getProfitForm>({
    timeInterval: 'year',
    mod: 'profit',
  });
  const [allowTimeSlot, setAllowTimeSlot] = useState({ from: '', to: '' });
  const [totalSaleData, setTotalSaleData] = useState<ITotalSaleData[]>([]);
  const [perCommodityData, setPerCommodityData] = useState<
    IPerCommoditySaleData[]
  >([]);
  const [recentSaleData, setRecentSaleData] = useState<ITotalSaleData[]>([]);
  const [saleOpen, setSaleOpen] = useState(false);
  const [totalSaleSelect, setTotalSaleSelect] =
    useState<getTotalSaleAndTotalSaleNumForm>({
      from: '',
      to: '',
      mod: 'day',
    });
  const [saleSelect, setSaleSelect] = useState(1);
  const [interval, setInterval] = useState<string>('month');
  const [inventoryTurnoverData, setInventoryTurnoverData] = useState<
    IInventoryTurnoverData[]
  >([]);
  const [recentTurnoverData, setRecentTurnoverData] = useState<
    IInventoryTurnoverVosData[]
  >([]);
  const [turnoverOpen, setTurnoverOpen] = useState(false);
  const [userCompositionData, setUserCompositionData] = useState({
    '2024年 第2学期': {
      教室: 1,
      寝室: 2,
    },
  });
  const [userCompositionSelect, setUserCompositionSelect] =
    useState<getUserCompositionForm>({ type: 'address' });
  const handleRecentDataChange = (data: IProfitVo[]) => {
    setRecentData(data);
  };
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
          console.log(res.data);
        } else {
          setOrdersData([]);
        }
      }
    );
    getProfitAPI(profitSelect).then((res) => {
      if (res && res.data) {
        setProfitData(res.data);
      }
    });
    getAllowTimeSlotAPI({ mod: 1 }).then((res) => {
      setAllowTimeSlot(res.data);
    });
    if (totalSaleSelect.from && saleSelect == 1) {
      getTotalSaleAndTotalSaleNumAPI(totalSaleSelect).then((res) => {
        setTotalSaleData(res.data);
      });
    }
    if (totalSaleSelect.from && saleSelect == 2) {
      getTotalSaleAndTotalSaleNumPerCommodityAPI(totalSaleSelect).then(
        (res) => {
          setPerCommodityData(res.data);
        }
      );
    }
    getInventoryTurnoverAPI({ interval: interval }).then((res) => {
      setInventoryTurnoverData(res.data);
    });
    getUserCompositionAPI(userCompositionSelect).then((res) => {
      setUserCompositionData(res.data);
    });
  }, [
    graphicType,
    time,
    value,
    granularity,
    profitSelect,
    totalSaleSelect,
    saleSelect,
    interval,
    userCompositionSelect,
  ]);
  useEffect(() => {
    getAllowTimeSlotAPI({ mod: saleSelect }).then((res) => {
      setAllowTimeSlot(res.data);
      setTotalSaleSelect({
        ...totalSaleSelect,
        from: res.data.from,
        to: res.data.to,
      });
    });
  }, [saleSelect]);
  return (
    <Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 5 }}
          >
            <TabList onChange={handleChange} aria-label="data analysis tabs">
              <Tab label="商品销售信息" value="1" />
              <Tab label="服装销售信息" value="2" />
              <Tab label="用户人数走势" value="3" />
              <Tab label="地址和消费分布" value="4" />
              <Tab label="订单的下单时间分布" value="5" />
              <Tab label="利润分析" value="6" />
              <Tab label="销售额和销售量走势" value="7" />
              <Tab label="库存周转率" value="8" />
              <Tab label="用户细分分析" value="9" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                aria-label="time span"
                sx={{ marginRight: 2 }}
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
                {salesData.length > 0 ? (
                  <ReactECharts
                    key={graphicType}
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
                ) : (
                  <NoData></NoData>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {salesData.length > 0 ? (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {
                        trigger: 'item',
                      },
                      legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                      },
                      series: [
                        {
                          name: '销售量',
                          type: 'pie',
                          data: salesData,
                        },
                      ],
                    }}
                    style={{ height: 400, width: 600 }}
                  />
                ) : (
                  <NoData></NoData>
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
                sx={{ marginRight: 2 }}
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
                {salesData.length > 0 ? (
                  <ReactECharts
                    key={graphicType}
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
                ) : (
                  <NoData></NoData>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {salesData.length > 0 ? (
                  <ReactECharts
                    option={{
                      title: {
                        text: '商品销售数据',
                      },
                      tooltip: {
                        trigger: 'item',
                      },
                      legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                      },
                      series: [
                        {
                          name: '销售量',
                          type: 'pie',
                          data: clothesData,
                        },
                      ],
                    }}
                    style={{ height: 400, width: 600 }}
                  />
                ) : (
                  <NoData></NoData>
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
            {userData.length > 0 ? (
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
            ) : (
              <NoData></NoData>
            )}
          </TabPanel>
          <TabPanel value="4">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {addressData != null ? (
                <ReactECharts
                  option={{
                    title: {
                      text: '地址分布情况',
                    },
                    tooltip: {
                      trigger: 'item',
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      y: 'center',
                    },
                    series: [
                      {
                        name: '销售量',
                        type: 'pie',
                        data: Object.keys(addressData).map((key) => ({
                          value: addressData[key],
                          name: key,
                        })),
                      },
                    ],
                  }}
                  style={{ height: 400, width: '50%' }}
                />
              ) : (
                <NoData></NoData>
              )}
              {consumptionData ? (
                <ReactECharts
                  option={{
                    title: {
                      text: '消费分布情况',
                    },
                    tooltip: {
                      trigger: 'item',
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      y: 'center',
                    },
                    series: [
                      {
                        name: '销售量',
                        type: 'pie',
                        data: Object.keys(consumptionData).map((key) => ({
                          value: consumptionData[key],
                          name: key,
                        })),
                      },
                    ],
                  }}
                  style={{ height: 400, width: '50%' }}
                />
              ) : (
                <NoData></NoData>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="5">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box width={'100%'}>
                <ToggleButtonGroup
                  value={time}
                  exclusive
                  onChange={handleTime}
                  aria-label="time span"
                  sx={{ marginRight: '30px' }}
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
              </Box>
              {Object.keys(ordersData).length > 0 ? (
                <ReactECharts
                  option={{
                    title: {
                      text: '订单的下单时间分布情况',
                    },
                    tooltip: {
                      trigger: 'item',
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      y: 'center',
                    },
                    series: [
                      {
                        name: '销售量',
                        type: 'pie',
                        data: Object.keys(ordersData).map((key) => ({
                          value: ordersData[key],
                          name: key,
                        })),
                      },
                    ],
                  }}
                  style={{ height: 400, width: '50%' }}
                />
              ) : (
                <NoData></NoData>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="6">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ToggleButtonGroup
                value={profitSelect.mod}
                exclusive
                onChange={(
                  _: React.MouseEvent<HTMLElement>,
                  newTime: string
                ) => {
                  setProfitSelect({
                    ...profitSelect,
                    mod: newTime,
                  });
                }}
                aria-label="time span"
                sx={{ marginRight: 2 }}
              >
                <ToggleButton value="profit" aria-label="profit">
                  利润
                </ToggleButton>
                <ToggleButton value="profitDivCost" aria-label="profitDivCost">
                  利润/成本
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField
                id="outlined-select-currency"
                select
                label="查询类型"
                sx={{ width: '200px' }}
                value={profitSelect.timeInterval}
                onChange={(e) => {
                  setProfitSelect({
                    ...profitSelect,
                    timeInterval: e.target.value,
                  });
                }}
              >
                <MenuItem value={'week'}>一周</MenuItem>
                <MenuItem value={'month'}>月份</MenuItem>
                <MenuItem value={'quarter'}>季度</MenuItem>
                <MenuItem value={'year'}>一年</MenuItem>
              </TextField>
            </Box>
            <Box>
              {profitData.length > 0 ? (
                <ReactECharts
                  option={{
                    title: {
                      text: '利润分析',
                    },
                    tooltip: {
                      trigger: 'axis',
                      formatter: function (params: echarts.ECElementEvent) {
                        const idx = params[0].dataIndex; // 获取数据索引
                        const item = profitData[idx]; // 获取对应的数据项
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
                      data: profitData.map((item) => item.commodityName),
                    },
                    yAxis: {},
                    series: [
                      {
                        name: '成本',
                        type: 'bar',
                        data: profitData.map((item) => item.cost),
                      },
                      {
                        name: '利润',
                        type: 'bar',
                        data: profitData.map((item) => item.profit),
                      },
                      {
                        name: '利润/成本比',
                        type: 'bar',
                        data: profitData.map((item) => item.profitDivCost),
                      },
                    ],
                  }}
                  style={{ height: 400, width: '100%' }}
                  onEvents={{
                    click: (params: echarts.ECElementEvent) => {
                      handleRecentDataChange(
                        profitData[params.dataIndex].profitVos
                      );
                      setOpen(true);
                    },
                  }}
                />
              ) : (
                <NoData></NoData>
              )}

              {recentData.length > 0 && (
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogContent>
                    <ReactECharts
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
                    ></ReactECharts>
                  </DialogContent>
                </Dialog>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="7">
            <Box
              sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}
            >
              <ToggleButtonGroup
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <TextField
                  margin="dense"
                  label="开始时间"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={totalSaleSelect?.from}
                  inputProps={{
                    min: allowTimeSlot.from,
                    max: totalSaleSelect.to,
                  }}
                  onChange={(e) =>
                    setTotalSaleSelect({
                      ...totalSaleSelect!,
                      from: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="结束时间"
                  type="date"
                  fullWidth
                  value={totalSaleSelect?.to}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: allowTimeSlot.to,
                    min: totalSaleSelect.from,
                  }}
                  onChange={(e) =>
                    setTotalSaleSelect({
                      ...totalSaleSelect!,
                      to: e.target.value,
                    })
                  }
                />

                <TextField
                  id="outlined-select-currency"
                  select
                  label="查询类型"
                  style={{ width: '400px' }}
                  onChange={(e) => {
                    setTotalSaleSelect({
                      ...totalSaleSelect,
                      mod: e.target.value,
                    });
                  }}
                  sx={{ marginTop: 1 }}
                >
                  <MenuItem value={'day'}>一天</MenuItem>
                  <MenuItem value={'week'}>一周</MenuItem>
                  <MenuItem value={'month'}>月份</MenuItem>
                  <MenuItem value={'quarter'}>季度</MenuItem>
                </TextField>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={saleSelect}
                exclusive
                onChange={(
                  _: React.MouseEvent<HTMLElement>,
                  newAlignment: string | null
                ) => {
                  if (newAlignment !== '销售走势') {
                    setSaleSelect(2);
                  } else {
                    setSaleSelect(1);
                  }
                }}
                aria-label="text alignment"
                sx={{ height: 50 }}
              >
                <ToggleButton
                  value="销售走势"
                  aria-label="销售走势"
                  sx={{
                    backgroundColor: saleSelect === 1 ? '#1976d2' : '',
                    color: saleSelect === 1 ? 'white' : 'black',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#1976d2',
                    },
                  }}
                >
                  销售走势
                </ToggleButton>
                <ToggleButton
                  value="每个商品销售量"
                  aria-label="每个商品销售量"
                  sx={{
                    backgroundColor: saleSelect === 2 ? '#1976d2' : '',
                    color: saleSelect === 2 ? 'white' : 'black',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#1976d2',
                    },
                  }}
                >
                  每个商品销售量
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {saleSelect === 1 ? (
              <ReactECharts
                option={{
                  title: {
                    text: '销售额和销售量走势',
                  },
                  tooltip: {
                    trigger: 'axis',
                  },
                  legend: {
                    data: ['销售额', '销售数量'],
                  },
                  xAxis: {
                    type: 'category',
                    data: totalSaleData.map((item) => item.label),
                  },
                  yAxis: [
                    {
                      type: 'value',
                      name: '销售额',
                      position: 'left',
                    },
                    {
                      type: 'value',
                      name: '销售数量',
                      position: 'right',
                    },
                  ],
                  series: [
                    {
                      name: '销售额',
                      type: 'line',
                      data: totalSaleData.map((item) => item.totalSale),
                    },
                    {
                      name: '销售数量',
                      type: 'line',
                      yAxisIndex: 1,
                      data: totalSaleData.map((item) => item.totalSaleNum),
                    },
                  ],
                }}
                style={{ height: 400, width: '100%' }}
              />
            ) : (
              <Box>
                {perCommodityData.length > 0 ? (
                  <ReactECharts
                    option={{
                      title: {
                        text: '利润分析',
                      },
                      tooltip: {
                        trigger: 'axis',
                        formatter: function (params: echarts.ECElementEvent) {
                          const idx = params[0].dataIndex; // 获取数据索引
                          const item = perCommodityData[idx]; // 获取对应的数据项
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
                        data: ['销售量', '销售额'],
                      },
                      xAxis: {
                        type: 'category',
                        data: perCommodityData.map(
                          (item) => item.commodityName
                        ),
                      },
                      yAxis: {},
                      series: [
                        {
                          name: '销售量',
                          type: 'bar',
                          data: perCommodityData.map(
                            (item) => item.totalSaleNum
                          ),
                        },
                        {
                          name: '销售额',
                          type: 'bar',
                          data: perCommodityData.map((item) => item.totalSale),
                        },
                      ],
                    }}
                    style={{ height: 400, width: '100%' }}
                    onEvents={{
                      click: (params: echarts.ECElementEvent) => {
                        setRecentSaleData(
                          perCommodityData[params.dataIndex]
                            .totalSalePerCommodityVos
                        );
                        setSaleOpen(true);
                      },
                    }}
                  />
                ) : (
                  <NoData></NoData>
                )}

                {recentSaleData.length > 0 && (
                  <Dialog open={saleOpen} onClose={() => setSaleOpen(false)}>
                    <DialogContent>
                      <ReactECharts
                        option={{
                          title: {
                            text: '最近数据',
                          },
                          legend: {
                            data: ['销售额', '销售量'],
                          },
                          xAxis: {
                            type: 'category',
                            data: recentSaleData.map((item) => item.label),
                          },
                          yAxis: {},
                          series: [
                            {
                              name: '销售额',
                              type: 'bar',
                              data: recentSaleData.map(
                                (item) => item.totalSale
                              ),
                            },
                            {
                              name: '销售量',
                              type: 'bar',
                              data: recentSaleData.map(
                                (item) => item.totalSaleNum
                              ),
                            },
                          ],
                        }}
                        style={{ height: 400, width: '100%', minWidth: 500 }}
                      ></ReactECharts>
                    </DialogContent>
                  </Dialog>
                )}
              </Box>
            )}
          </TabPanel>
          <TabPanel value="8">
            <ToggleButtonGroup
              value={interval}
              exclusive
              onChange={(_: React.MouseEvent<HTMLElement>, newTime: string) => {
                setInterval(newTime);
              }}
              aria-label="time span"
            >
              <ToggleButton value="month" aria-label="profit">
                month
              </ToggleButton>
              <ToggleButton value="year" aria-label="profitDivCost">
                year
              </ToggleButton>
            </ToggleButtonGroup>
            <Box>
              <ReactECharts
                option={{
                  title: {
                    text: '库存周转率',
                  },
                  tooltip: {
                    trigger: 'axis',
                    formatter: function (params: echarts.ECElementEvent) {
                      const idx = params[0].dataIndex; // 获取数据索引
                      const item = inventoryTurnoverData[idx]; // 获取对应的数据项
                      const content = params
                        .map((item) => {
                          return `${item.seriesName}: ${item.value}`;
                        })
                        .join('<br/>');
                      return `<div>
                      <img src="${item.commodityImg}" alt="${item.commodityName}" style="width:50px;height:50px;"/>
                      <br/>${item.commodityName}<br/>${content}
                    </div>`;
                    },
                  },
                  legend: {
                    data: ['库存周转率'],
                  },
                  xAxis: {
                    type: 'category',
                    data: inventoryTurnoverData.map(
                      (item) => item.commodityName
                    ),
                  },
                  yAxis: {},
                  series: [
                    {
                      name: '库存周转率',
                      type: 'bar',
                      data: inventoryTurnoverData.map(
                        (item) => item.inventoryTurnover
                      ),
                    },
                  ],
                }}
                style={{ height: 400, width: '100%' }}
                onEvents={{
                  click: (params: echarts.ECElementEvent) => {
                    setRecentTurnoverData(
                      inventoryTurnoverData[params.dataIndex]
                        .inventoryTurnoverVos
                    );
                    setTurnoverOpen(true);
                  },
                }}
              />
              {recentTurnoverData.length > 0 && (
                <Dialog
                  open={turnoverOpen}
                  onClose={() => setTurnoverOpen(false)}
                >
                  <DialogContent>
                    <ReactECharts
                      option={{
                        title: {
                          text: '最近数据',
                        },
                        legend: {
                          data: ['库存周转率'],
                        },
                        xAxis: {
                          type: 'category',
                          data: recentTurnoverData.map((item) => item.label),
                        },
                        yAxis: {},
                        series: [
                          {
                            name: '库存周转率',
                            type: 'bar',
                            data: recentTurnoverData.map(
                              (item) => item.inventoryTurnover
                            ),
                          },
                        ],
                      }}
                      style={{ height: 400, width: '100%', minWidth: 500 }}
                    ></ReactECharts>
                  </DialogContent>
                </Dialog>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="9">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                aria-label="time span"
                sx={{ width: '100%' }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="查询类型"
                  style={{ width: '400px' }}
                  onChange={(e) => {
                    setUserCompositionSelect({ type: e.target.value });
                  }}
                >
                  <MenuItem value={'address'}>收货地址组成</MenuItem>
                  <MenuItem value={'first_category'}>商品分类组成</MenuItem>
                  <MenuItem value={'grade'}>年级组成</MenuItem>
                  <MenuItem value={'orders_price'}>客单价组成</MenuItem>
                  <MenuItem value={'purchase_frequency'}>购买频次组成</MenuItem>
                  <MenuItem value={'total_consume'}>总金额组成</MenuItem>
                </TextField>
              </ToggleButtonGroup>
              <Box>
                {Object.entries(userCompositionData).length > 0 ? (
                  Object.entries(userCompositionData).map(([key, value]) => (
                    <ReactECharts
                      key={key}
                      option={{
                        title: {
                          text: `${key} 数据`,
                          left: 'center',
                        },
                        tooltip: {
                          trigger: 'item',
                        },
                        legend: {
                          orient: 'vertical',
                          left: 'left',
                        },
                        series: [
                          {
                            name: '数据',
                            type: 'pie',
                            radius: '50%',
                            data: Object.entries(value).map(
                              ([name, value]) => ({
                                name,
                                value,
                              })
                            ),
                            emphasis: {
                              itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                              },
                            },
                          },
                        ],
                      }}
                      style={{ height: 400, width: 400 }}
                    />
                  ))
                ) : (
                  <NoData></NoData>
                )}
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
