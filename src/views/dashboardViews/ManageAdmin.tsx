import { useState, useEffect } from 'react';
import { getAllManagerAPI, updateManagerAPT } from '../../request/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
const rows = [
  {
    accountId: 'ac63fbdc-c2c3-4007-9d62-3751331c1a04',
    nickname: '乔艳',
    avatarUrl: 'http://dummyimage.com/100x100',
    account: 'c4c81470e54e4968ae75b7aaf843a81f',
    phoneNum: '15228621357',
    createTime: '2024-05-07',
  },
  {
    accountId: 'c74dbd70-7738-4460-9b7c-fe30c505edba',
    nickname: '牛鱼非',
    avatarUrl:
      'https://avatar-img-liuhaha.oss-cn-beijing.aliyuncs.com/b/6/a/b6a1bc30-358a-4213-b27e-4b9ee450b6ef.png',
    account: '685875a5bbeb4fcb9150146dc738aaaf',
    phoneNum: '15228621357',
    createTime: '2024-04-28',
  },
];

export function ManageAdmin() {
  const [data, setData] = useState(rows);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
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
    updateManagerAPT(data[id]).then((res) => {
      console.log(res);
    });
  };
  const addManager = () => {
    //添加管理员
  };

  return (
    <div>
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
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: '10%' }}>
                accountId
              </TableCell>
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
                行为
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.accountId}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.accountId}
                </TableCell>
                <TableCell align="left">{row.nickname}</TableCell>
                <TableCell align="left">{row.avatarUrl}</TableCell>
                <TableCell align="left">{row.account}</TableCell>
                <TableCell align="left">{row.phoneNum}</TableCell>
                <TableCell align="left">{row.createTime}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="error">
                    删除
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                      setId(index);
                    }}
                  >
                    修改
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        fullWidth={'true'}
        maxWidth={'md'}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'修改信息'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].accountId}
              variant="outlined"
              style={{ width: '100%', marginTop: '10px' }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].nickname}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].avatarUrl}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].account}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].phoneNum}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label={data[id].createTime}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            修改
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
