import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
export function PersonalCenter() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          borderBlockEnd: '1px solid black',
        }}
      >
        <AccountCircleIcon
          color="success"
          style={{ width: '150px', height: '150px' }}
        />
        <Typography variant="h3" noWrap>
          管理员
        </Typography>
        <Typography variant="h6" noWrap>
          191****9634
        </Typography>
        <Typography variant="h6" noWrap>
          ID:11111
        </Typography>
      </div>
      <div
        style={{ width: '100%', height: '100%', backgroundColor: '#F1F1F1 ' }}
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
}