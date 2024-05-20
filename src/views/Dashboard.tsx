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
  Collapse,
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
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
const drawerWidth = 240;

export function Dashboard() {
  const [open, setOpen] = useState(false);
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
              <ListItem>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon>
                    <AccountCircleIcon color="success" fontSize="large" />
                  </ListItemIcon>
                  个人中心
                  <ListItemText />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                style={{ backgroundColor: '	#DCDCDC' }}
              >
                <List component="div" disablePadding>
                  <Link to="/dashboard/personalcenter/myemail">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <MailIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="我的消息" />
                    </ListItemButton>
                  </Link>
                  <Link to="/dashboard/personalcenter/complaints">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <CreateIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="投诉与建议" />
                    </ListItemButton>
                  </Link>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AccountCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="我的账号" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Link to="/dashboard/dataanlysis">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <FeedIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    数据分析
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/manageadmin">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    管理员管理
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/voucher">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <ContactEmergencyIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    优惠卷
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/commodity">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <VerifiedUserIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    商品
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/batch">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <EqualizerIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    批次
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/dashboard/sellingprice">
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <PeopleIcon color="success" fontSize="large" />
                    </ListItemIcon>
                    售卖价格
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              </Link>
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