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
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const drawerWidth = 240;

export function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <div>
          <List>
            <Link to="/dashboard/personalCenter">
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                个人中心
                <ListItemText />
              </ListItem>
            </Link>
            <ListItem>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              订单管理
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              商品管理
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ContactEmergencyIcon />
              </ListItemIcon>
              用户管理
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VerifiedUserIcon />
              </ListItemIcon>
              信息审核
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              数据分析
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              会员设置
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalFireDepartmentIcon />
              </ListItemIcon>
              红包设置
              <ListItemText />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: 3, marginTop: '64px' }}>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
