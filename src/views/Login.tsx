import { useState } from 'react';

import { Button, FormGroup, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

// 登录界面
export function Login() {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  return (
    <div className={styles.body}>
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
            <Link to="/dashboard">
              <Button type="submit" variant="contained" color="success">
                登录
              </Button>
            </Link>
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
