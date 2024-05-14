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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import CreateIcon from '@mui/icons-material/Create';
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
      <div>
        <AccountCircleIcon
          color="success"
          style={{ width: '200px', height: '200px' }}
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
      <div>
        <List sx={{ display: 'flex', flexDirection: 'row', width: '500px' }}>
          <ListItem>
            <MailIcon color="success" fontSize="large" />
            我的消息
          </ListItem>
          <ListItem>
            <CreateIcon color="success" fontSize="large" />
            投诉与建议
          </ListItem>
          <ListItem>
            <AccountCircleIcon color="success" fontSize="large" />
            我的账号
          </ListItem>
        </List>
      </div>
    </div>
  );
}
