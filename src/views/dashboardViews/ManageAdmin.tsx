import { useState, useEffect } from 'react';
import { getAllManagerAPI, updateManagerAPT } from '../../request/api';

import {
  Box,
  DialogActions,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const rows = [
  {
    accountId: 'ac63fbdc-c2c3-4007-9d62-3751331c1a04',
    nickname: '乔艳',
    avatarUrl: 'http://dummyimage.com/100x100',
    account: 'c4c81470e54e4968ae75b7aaf843a81f',
    phoneNum: '15228621357',
    createTime: '2024-05-07',
  },
];

export function ManageAdmin() {
  const [data, setData] = useState(rows);
  const [open, setOpen] = useState(false);
  const [changeAdmin, setChangeAdmin] = useState({
    accountId: 'ac63fbdc-c2c3-4007-9d62-3751331c1a04',
    nickname: '乔艳',
    avatarUrl: 'http://dummyimage.com/100x100',
    password: '123456789',
    phoneNum: '15228621357',
  });
  useEffect(() => {
    //请求数据
    getAllManagerAPI().then((res) => {
      setData(res.data);
    });
  }, []);
  const deleteManager = (id) => {
    //删除管理员
  };
  const updateManager = () => {
    //更新管理员信息
    updateManagerAPT(changeAdmin).then((res) => {
      console.log(res);
    });
  };
  const addManager = () => {
    //添加管理员
  };

  return (
    <Box sx={{ p: 2 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          style={{ margin: '10px' }}
        >
          管理员管理
        </Typography>
        <div style={{ padding: '10px' }}>
          <TextField></TextField>
          <Button
            variant="contained"
            color="success"
            style={{ height: '56px' }}
          >
            添加
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
            <TableRow>
              <TableCell align="left" style={{ width: '10%' }}>
                nickname
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                avatarUrl
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                account
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                phoneNum
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                createTime
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.accountId}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">{row.nickname}</TableCell>
                <TableCell align="left">{row.avatarUrl}</TableCell>
                <TableCell align="left">{row.account}</TableCell>
                <TableCell align="left">{row.phoneNum}</TableCell>
                <TableCell align="left">{row.createTime}</TableCell>
                <TableCell align="left">
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpen(true);
                        setChangeAdmin({
                          ...changeAdmin,
                          accountId: row.accountId,
                          nickname: row.nickname,
                          avatarUrl: row.avatarUrl,
                          phoneNum: row.phoneNum,
                        });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        console.log('删除');
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        fullWidth
        maxWidth={'md'}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'修改信息'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={changeAdmin.accountId}
              variant="outlined"
              style={{ width: '100%', marginTop: '10px' }}
              onChange={(e) => {
                setChangeAdmin({
                  ...changeAdmin,
                  accountId: e.target.value,
                });
              }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={changeAdmin.nickname}
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => {
                setChangeAdmin({
                  ...changeAdmin,
                  nickname: e.target.value,
                });
              }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={changeAdmin.avatarUrl}
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => {
                setChangeAdmin({
                  ...changeAdmin,
                  avatarUrl: e.target.value,
                });
              }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={changeAdmin.password}
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => {
                setChangeAdmin({
                  ...changeAdmin,
                  password: e.target.value,
                });
              }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={changeAdmin.phoneNum}
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => {
                setChangeAdmin({
                  ...changeAdmin,
                  phoneNum: e.target.value,
                });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button
            onClick={() => {
              updateManager();
              setOpen(false);
            }}
            autoFocus
          >
            修改
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
