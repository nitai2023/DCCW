import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, FormGroup, TextField, Alert, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { userLoginAPI } from '../request/api';
import { useNavigate } from 'react-router-dom';
// 登录界面
export function Login() {
  const [loginForm, setLoginForm] = useState({
    loginType: 1,
    username: '',
    password: '',
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const redirected = query.get('redirected');
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (redirected) setOpen(true);
  }, []);
  async function handleLogin() {
    const res = (await userLoginAPI(loginForm)).data;
    window.localStorage.setItem('userToken', res);
    navigate('/dashboard');
  }
  return (
    <div className={styles.body}>
      {redirected && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ maxWidth: '600px', width: '100%' }}
        >
          <Alert
            severity="error"
            onClose={handleClose}
            sx={{ float: 'right', width: '50%', marginTop: '20px' }}
          >
            请先登录
          </Alert>
        </Snackbar>
      )}
      <div className={styles.form}>
        <FormGroup>
          <div className={styles.MuiFormGroup_row}>
            <label>用户名</label>
            <TextField
              required
              id="username"
              label="username"
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
          </div>
          <div className={styles.MuiFormGroup_row}>
            <label>密码</label>
            <TextField
              required
              id="password"
              label="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>
          <div className={styles.MuiFormGroup_row}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={handleLogin}
            >
              登录
            </Button>
            <Link to="/">
              <Button type="submit" variant="contained" color="primary">
                回到主页
              </Button>
            </Link>
          </div>
        </FormGroup>
      </div>
    </div>
  );
}
