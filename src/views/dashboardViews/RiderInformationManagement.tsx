import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogTitle,
  Avatar,
  Grid,
  Switch,
} from '@mui/material';

import ConfirmDeletev from '../../components/Confirm';
import EditIcon from '@mui/icons-material/Edit';
// 骑手信息管理
interface IRiders {
  avatarUrl: string;
  id: string;
  idCardCode: string;
  isApply: number;
  isStudent: string;
  nickName: string;
  openId: string;
  phone: string;
  realName: string;
  studentIdCode: string;
}
interface IRidersApply {
  idCardCode: string;
  idCardSrc: string;
  isStudent: string;
  phone: string;
  realName: string;
  riderId: string;
  studentIdCode: string;
  studentIdSrc: string;
}

export function RiderInformationManagement() {
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10, total: 0 });
  const [select, setSelect] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [riders, setRiders] = useState<IRiders[]>([]);
  const [riderApply, setRiderApply] = useState<IRidersApply[]>([]);
  const [rider, setRider] = useState<IRiders | null>(null);
  useEffect(() => {
    if (select) {
      axios
        .get(
          `http://182.92.128.37:8501//rider/getAllRiders/${page.pageNum}/${page.pageSize}`
        )
        .then((res) => {
          setRiders(res.data.data.list);
          setPage({ ...page, total: res.data.data.total });
        });
    } else {
      axios
        .get(
          `http://182.92.128.37:8501//rider/getApplyInfo/${page.pageNum}/${page.pageSize}`
        )
        .then((res) => {
          setRiderApply(res.data.data.list);
        });
    }
  }, [select]);
  function updateRider() {
    axios
      .post(`http://182.92.128.37:8501//rider/updateRider`, rider)
      .then(() => {
        window.location.reload();
      });
  }
  function processApply(id: string, isApply: number) {
    axios
      .post(`http://182.92.128.37:8501//rider/processApply`, {
        isApply: isApply,
        riderId: id,
      })
      .then(() => {
        window.location.reload();
      });
  }
  function handleDelete(id: string) {
    axios
      .post(`http://182.92.128.37:8501//rider/deleteRider`, {
        riderId: id,
      })
      .then(() => {
        window.location.reload();
      });
  }
  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3">骑手信息</Typography>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={select}
                onChange={(e) => setSelect(e.target.checked)}
              />
            }
            label={select ? '骑手信息' : '认证查询'}
          />
        </Box>
      </Box>
      {select ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '	#DCDCDC' }}>
              <TableRow>
                <TableCell>头像</TableCell>
                <TableCell>昵称</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>是否通过认证</TableCell>
                <TableCell>是否是学生</TableCell>
                <TableCell>电话</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riders.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={user.avatarUrl || 'default-avatar.png'}
                      alt="Avatar"
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>{user.isApply ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{user.isStudent}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell align="right">
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setRider(user);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <ConfirmDeletev
                        onDelete={() => handleDelete(user.id)}
                      ></ConfirmDeletev>
                    </TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>idCardCode</TableCell>
                <TableCell>骑手ID</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>是否是学生</TableCell>
                <TableCell>电话</TableCell>
                <TableCell>studentIdCode</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riderApply.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.idCardCode}</TableCell>
                  <TableCell>{user.riderId}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>{user.isStudent}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.studentIdCode}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={() => {
                        processApply(user.riderId, 1);
                      }}
                    >
                      通过
                    </Button>
                    <Button
                      onClick={() => {
                        processApply(user.riderId, -1);
                      }}
                    >
                      拒绝
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={1 + page.total / 10}
        variant="outlined"
        color="primary"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'end',
          marginTop: '10px',
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="user-dialog-title"
      >
        <DialogTitle id="user-dialog-title">修改骑手信息</DialogTitle>
        {rider && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Avatar
                  src={rider.avatarUrl || 'default-avatar.png'}
                  alt="Avatar"
                  style={{ width: 100, height: 100, margin: '0 auto' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ID"
                  name="id"
                  value={rider.id}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ID Card Code"
                  name="idCardCode"
                  value={rider.idCardCode}
                  onChange={(e) => {
                    setRider({ ...rider, idCardCode: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Is Apply"
                  name="isApply"
                  value={rider.isApply}
                  onChange={(e) => {
                    setRider({ ...rider, isApply: Number(e.target.value) });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Is Student"
                  name="isStudent"
                  value={rider.isStudent}
                  onChange={(e) => {
                    setRider({ ...rider, isStudent: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Nick Name"
                  name="nickName"
                  value={rider.nickName}
                  onChange={(e) => {
                    setRider({ ...rider, nickName: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Open ID"
                  name="openId"
                  value={rider.openId}
                  onChange={(e) => {
                    setRider({ ...rider, openId: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={rider.phone}
                  onChange={(e) => {
                    setRider({ ...rider, phone: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Real Name"
                  name="realName"
                  value={rider.realName}
                  onChange={(e) => {
                    setRider({ ...rider, realName: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Student ID Code"
                  name="studentIdCode"
                  value={rider.studentIdCode}
                  onChange={(e) => {
                    setRider({ ...rider, studentIdCode: e.target.value });
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            onClick={() => {
              updateRider();
              setOpen(false);
            }}
            color="primary"
          >
            提交
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
