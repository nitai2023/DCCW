import React, { useState } from 'react';
import {
  Button,
  Popper,
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ConfirmDelete = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDelete = () => {
    onDelete();
    setAnchorEl(null);
    window.location.reload();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box sx={{ display: 'inline' }}>
      <IconButton onClick={handleClick} color="error">
        <DeleteIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper elevation={3} style={{ padding: '16px', marginTop: '8px' }}>
          <Typography variant="h6" gutterBottom>
            确认删除
          </Typography>
          <Typography variant="body2" gutterBottom>
            你确定想删除这一项
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" onClick={handleDelete} color="primary">
              确定
            </Button>
            <Button variant="outlined" onClick={() => setAnchorEl(null)}>
              取消
            </Button>
          </Box>
        </Paper>
      </Popper>
    </Box>
  );
};

export default ConfirmDelete;
