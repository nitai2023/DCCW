import { useState, useEffect } from 'react';
import {
  getAllManagerAPI,
  updateManagerAPT,
  addManagerAPI,
} from '../../request/api';

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
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
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
// 管理员管理
export function ManageAdmin() {
  const [data, setData] = useState(rows);
  const [open, setOpen] = useState({
    changeAdmin: false,
    addAdmin: false,
    deleteAdmin: false,
  });
  const [changeAdmin, setChangeAdmin] = useState({
    accountId: 'ac63fbdc-c2c3-4007-9d62-3751331c1a04',
    nickname: '乔艳',
    avatarUrl: 'http://dummyimage.com/100x100',
    password: '123456789',
    phoneNum: '15228621357',
  });
  const [deleteAdmin, setDeleteAdmin] = useState({});
  const [addAdmin, setAddAdmin] = useState({});
  useEffect(() => {
    //请求数据
    getAllManagerAPI().then((res) => {
      setData(res.data);
    });
  }, []);
  const deleteManager = () => {
    //删除管理员
    deleteManagerAPI({
      deleteManager: deleteAdmin.deleteManager,
      replaceManager: deleteAdmin.replaceManager,
    });
  };
  const updateManager = () => {
    //更新管理员信息
    updateManagerAPT(changeAdmin);
  };
  const addManager = () => {
    //添加管理员
    addManagerAPI(addAdmin);
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpen({ ...open, addAdmin: true })}
          >
            新增管理员
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
            <TableRow>
              <TableCell align="left" style={{ width: '10%' }}>
                头像
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                昵称
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                电话
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                注册时间
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
                <TableCell align="left">
                  <img
                    src={row.avatarUrl || 'default-avatar.png'}
                    alt="Avatar"
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell align="left">{row.nickname}</TableCell>
                <TableCell align="left">{row.phoneNum}</TableCell>
                <TableCell align="left">{row.createTime}</TableCell>
                <TableCell align="left">
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setOpen({ ...open, changeAdmin: true });
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
                        setDeleteAdmin({
                          ...deleteAdmin,
                          deleteManager: row.accountId,
                        });
                        setOpen({ ...open, deleteAdmin: true });
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
        open={open.changeAdmin}
        fullWidth
        maxWidth={'md'}
        onClose={() => setOpen({ ...open, changeAdmin: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">修改信息</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginTop: 2 }}
          >
            <TextField
              label="昵称"
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
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginTop: 2 }}
          >
            <TextField
              label="头像链接"
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
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginTop: 2 }}
          >
            <TextField
              label="密码"
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
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginTop: 2 }}
          >
            <TextField
              label="手机号"
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
          <Button onClick={() => setOpen({ ...open, changeAdmin: false })}>
            取消
          </Button>
          <Button
            onClick={() => {
              updateManager();
              setOpen({ ...open, changeAdmin: false });
            }}
            autoFocus
          >
            修改
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open.addAdmin}
        onClose={() => setOpen({ ...open, addAdmin: false })}
      >
        <DialogTitle>添加用户</DialogTitle>
        <DialogContent>
          <DialogContentText>请填写以下信息以添加新用户。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="昵称"
            type="text"
            fullWidth
            variant="standard"
            value={addAdmin.nickname}
            onChange={(e) => {
              setAddAdmin({
                ...addAdmin,
                nickname: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            label="头像 URL"
            type="text"
            fullWidth
            variant="standard"
            value={addAdmin.avatarUrl}
            onChange={(e) => {
              setAddAdmin({
                ...addAdmin,
                avatarUrl: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            variant="standard"
            value={addAdmin.password}
            onChange={(e) => {
              setAddAdmin({
                ...addAdmin,
                password: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            label="电话号码"
            type="text"
            fullWidth
            variant="standard"
            value={addAdmin.phoneNum}
            onChange={(e) => {
              setAddAdmin({
                ...addAdmin,
                phoneNum: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen({ ...open, addAdmin: false })}>
            取消
          </Button>
          <Button onClick={() => addManager()}>添加</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open.deleteAdmin}
        onClose={() => setOpen({ ...open, deleteAdmin: false })}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': { width: '100%', maxWidth: 400 },
          },
        }}
      >
        <DialogTitle>删除管理员</DialogTitle>
        <DialogContent>
          <DialogContentText>
            选择删除后接管任务的管理员 {deleteAdmin.nickName}
          </DialogContentText>
          <List>
            {data.map((item) => (
              <ListItem>
                <ListItemButton
                  onClick={() =>
                    setDeleteAdmin({
                      ...deleteAdmin,
                      replaceManager: item.accountId,
                      nickName: item.nickname,
                    })
                  }
                >
                  <img
                    src={item.avatarUrl || 'default-avatar.png'}
                    alt="Avatar"
                    style={{ width: 50, height: 50 }}
                  />
                  {item.nickname}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen({ ...open, deleteAdmin: false })}>
            取消
          </Button>
          <Button color="error" onClick={() => deleteManager()}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
