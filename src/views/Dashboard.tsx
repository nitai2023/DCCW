import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Divider,
  ListItemButton,
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <nav style={{}}>
        <AppBar position="static" color="success">
          <Toolbar>
            <Typography variant="h4" noWrap textAlign={'center'}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </nav>
      <main style={{ display: 'flex', width: '100%', height: '100%' }}>
        <aside
          style={{
            width: '300px',
            height: '100%',
            borderRight: '1px solid black',
          }}
        >
          <div>
            <List>
              <Link to="/dashboard/personalCenter">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    个人中心
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/ordermanangement">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <FeedIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    订单管理
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  商品管理
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ContactEmergencyIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  用户管理
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <VerifiedUserIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  信息审核
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <EqualizerIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  数据分析
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  会员设置
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalFireDepartmentIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  红包设置
                  <ListItemText />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </aside>
        <article
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            height: '100%',
          }}
        >
          <Outlet></Outlet>
        </article>
      </main>
    </div>
  );
}
