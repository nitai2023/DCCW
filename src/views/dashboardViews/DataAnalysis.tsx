import { Box, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { getCommodityAnalysisAPI } from '../../request/api';
// 数据分析
export function DataAnalysis() {
  const [salesData, setSalesData] = useState([]);
  useEffect(() => {
    getCommodityAnalysisAPI({ graphicType: 'bar', span: 'month' }).then(
      (res) => {
        setSalesData(res.data);
      }
    );
  }, []);
  return (
    <Box>
      <Typography variant="h3">数据分析</Typography>
      <Box>
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
        />
      </Box>
      <Box>
        <ReactECharts
          option={{
            title: {
              text: '饼状图',
            },
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: '销售量',
                type: 'pie',
                data: salesData.map((item) => ({
                  name: item.category,
                  value: item.totalSales,
                })),
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
