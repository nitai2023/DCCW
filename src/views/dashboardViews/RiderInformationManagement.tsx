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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { number } from 'echarts';
export function RiderInformationManagement() {
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10, total: 0 });
  const [select, setSelect] = useState(true);
  const [open, setOpen] = useState(false);
  const [riders, setRiders] = useState([]);
  const [rider, setRider] = useState({});
  useEffect(() => {
    select ? getRiderInfo() : getApplyInfo();
  }, [select]);

  function getRiderInfo() {
    axios
      .get(
        `http://182.92.128.37:8501//rider/getAllRiders/${page.pageNum}/${page.pageSize}`
      )
      .then((res) => {
        setRiders(res.data.data.list);
        setPage({ ...page, total: res.data.data.total });
      });
  }
  function getApplyInfo() {
    axios
      .get(
        `http://182.92.128.37:8501//rider/getApplyInfo/${page.pageNum}/${page.pageSize}`
      )
      .then((res) => {
        setRiders(res.data.data.list);
      });
  }
  function updateRider() {
    console.log(rider);
    axios.post(`http://182.92.128.37:8501//rider/updateRider`, rider);
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
            control={<Switch defaultChecked />}
            value={select}
            onChange={(e) => setSelect(e.target.checked)}
            label={select ? '骑手信息' : '认证查询'}
          />
        </Box>
      </Box>
      {select ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Is Apply</TableCell>
                <TableCell>Is Student</TableCell>
                <TableCell>Nick Name</TableCell>
                <TableCell>Open ID</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Real Name</TableCell>
                <TableCell>Action</TableCell>
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
                  <TableCell>{user.isApply ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{user.isStudent}</TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.openId}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>
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
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>idCardCode</TableCell>
                <TableCell>idCardSrc</TableCell>
                <TableCell>isStudent</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>realName</TableCell>
                <TableCell>riderId</TableCell>
                <TableCell>studentIdCode</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riders.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.idCardCode}</TableCell>
                  <TableCell>{user.idCardSrc}</TableCell>
                  <TableCell>{user.isStudent}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>{user.riderId}</TableCell>
                  <TableCell>{user.studentIdCode}</TableCell>
                  <TableCell>
                    <Button>通过</Button>
                    <Button>拒绝</Button>
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
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="user-dialog-title"
      >
        <DialogTitle id="user-dialog-title">修改骑手信息</DialogTitle>
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
              <TextField label="ID" name="id" value={rider.id} fullWidth />
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
