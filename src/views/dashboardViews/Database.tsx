import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Popper,
  Typography,
  ClickAwayListener,
  Box,
} from '@mui/material';
import { getMysqlBackupListAPI, rollbackMysqlAPI } from '../../request/api';
import { useEffect, useState } from 'react';

export function Database() {
  const [data, setData] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  useEffect(() => {
    getMysqlBackupListAPI().then((res) => {
      setData(res.data);
    });
  }, []);
  const handleClick = (date: string) => {
    setSelectedDate(date);
    setAnchorEl(null);
    rollbackMysqlAPI({ date: date }).then((res) => {
      console.log(res);
    });
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    date: string
  ) => {
    setSelectedDate(date);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
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
                      onClick={(event) => {
                        handleButtonClick(event, date);
                      }}
                    >
                      恢复备份
                    </Button>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box
                          sx={{
                            border: 1,
                            p: 1,
                            bgcolor: 'background.paper',
                            boxShadow: 3,
                          }}
                        >
                          <Typography>确认恢复备份?</Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              handleClick(selectedDate!);
                            }}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            确认
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{ mt: 1 }}
                          >
                            取消
                          </Button>
                        </Box>
                      </ClickAwayListener>
                    </Popper>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
