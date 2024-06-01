import { useEffect, useState } from 'react';
import { getVipListAPI, changeUpgradeConditionAPI } from '../../request/api';
import {
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export function VipCenter() {
  const [rows, setRows] = useState([]);
  const [changeVip, setChangeVip] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getVipListAPI().then((res) => {
      setRows(res.data);
    });
  }, [changeVip]);
  const handleChange = () => {
    changeUpgradeConditionAPI(changeVip).then((res) => {
      setChangeVip({});
    });
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
          会员中心
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: '10%' }}>
                vipLevelCode
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                vipLevelName
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                discountRate
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                spendMin
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                spendMax
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                description
              </TableCell>
              <TableCell align="left" style={{ width: '10%' }}>
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.vipLevelCode}
                </TableCell>
                <TableCell align="left">{row.vipLevelName}</TableCell>
                <TableCell align="left">{row.discountRate}</TableCell>
                <TableCell align="left">{row.spendMin}</TableCell>
                <TableCell align="left">{row.spendMax}</TableCell>
                <TableCell align="left">{row.description}</TableCell>

                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                      setChangeVip({
                        vipLevelCode: row.vipLevelCode,
                        spendMin: row.spendMin,
                        spendMax: row.spendMax,
                      });
                    }}
                  >
                    修改升级条件
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>修改升级条件</DialogTitle>
        <DialogContent sx={{ margin: '20px' }}>
          <TextField
            id="outlined-password-input"
            label="spendMin"
            type="number"
            sx={{ margin: '5px' }}
            value={changeVip.spendMin}
            onChange={(e) => {
              setChangeVip({
                ...changeVip,
                spendMin: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-number"
            label="spendMax"
            type="number"
            sx={{ margin: '5px' }}
            value={changeVip.spendMax}
            onChange={(e) => {
              setChangeVip({
                ...changeVip,
                spendMax: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              handleChange();
            }}
          >
            修改
          </Button>
          <Button onClick={() => setOpen(false)}>取消</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
