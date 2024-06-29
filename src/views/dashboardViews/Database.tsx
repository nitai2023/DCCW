import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { getMysqlBackupListAPI, rollbackMysqlAPI } from '../../request/api';
import { useEffect, useState } from 'react';

export function Database() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    getMysqlBackupListAPI().then((res) => {
      setData(res.data);
    });
  }, []);
  const handleClick = (date: string) => {
    // 恢复备份的逻辑
    rollbackMysqlAPI({ date: date }).then((res) => {
      console.log(res);
    });
  };
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 770 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>日期</TableCell>
            <TableCell width={200}>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((date, index) => (
              <TableRow key={date}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(date);
                      }}
                    >
                      恢复备份
                    </Button>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
