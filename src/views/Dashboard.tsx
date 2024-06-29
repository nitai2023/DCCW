import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import FeedIcon from '@mui/icons-material/Feed';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { getManagerInfoAPI } from '../request/api';
import { useEffect, useState } from 'react';
const drawerWidth = 240;
interface IAdmin {
  accountId: string;
  nickname: string;
  avatarUrl: string;
  account: string;
  phoneNum: string;
  createTime: string;
  accountTypeCode: string;
}
export function Dashboard() {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  useEffect(() => {
    getManagerInfoAPI().then((res) => {
      setAdmin(res.data);
    });
  }, []);
  return (
    <Box
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
            {admin ? (
              admin.accountTypeCode == 'AT0001' ? (
                <List>
                  <Link to="/dashboard/personalcenter/complaints">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <CreateIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        投诉与建议
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
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
                          <ManageAccountsIcon
                            color="success"
                            fontSize="large"
                          />
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
                          <ContactEmergencyIcon
                            color="success"
                            fontSize="large"
                          />
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
                  <Link to="/dashboard/vipcenter">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <PeopleIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        会员中心
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/riderinformationmanagement">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <DirectionsBikeIcon
                            color="success"
                            fontSize="large"
                          />
                        </ListItemIcon>
                        骑手信息管理
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/chat">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <MailIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        聊天
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/order">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <AssignmentIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        订单
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/database">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <BackupTableIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        数据库备份
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              ) : (
                <List>
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

                  <Link to="/dashboard/riderinformationmanagement">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <DirectionsBikeIcon
                            color="success"
                            fontSize="large"
                          />
                        </ListItemIcon>
                        骑手信息管理
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/chat">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <MailIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        聊天
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/order">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <AssignmentIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        订单
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to="/dashboard/database">
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <BackupTableIcon color="success" fontSize="large" />
                        </ListItemIcon>
                        数据库备份
                        <ListItemText />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              )
            ) : (
              <></>
            )}
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
    </Box>
  );
}
