import React from 'react';
import { Button, Input, FormGroup, TextField } from '@mui/material';
import { HashRouter as Router, Link } from 'react-router-dom';
import styles from './Login.module.scss';
// 登录界面
function Login() {
  return (
    <Router>
      <div className={styles.body}>
        <div className={styles.form}>
          <FormGroup>
            <div className={styles.MuiFormGroup_row}>
              <label>用户名</label>
              <TextField required id="username" label="username" />
            </div>
            <div className={styles.MuiFormGroup_row}>
              <label>密码</label>
              <TextField required id="password" label="password" />
            </div>

            <div className={styles.MuiFormGroup_row}>
              <Button type="submit" variant="contained" color="success">
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
    </Router>
  );
}

export default Login;
