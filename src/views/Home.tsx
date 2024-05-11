import React from 'react';
import { Button } from '@mui/material';
import { HashRouter as Router, Link } from 'react-router-dom';
import styles from './Home.module.scss';
// 主页
function Home() {
  return (
    <Router>
      <div className={styles.body}>
        <div className={styles.main}>
          <h1>DCCW</h1>
          <h2>逐梦校园管理端</h2>
          <Link to="/Login">
            <Button type="submit" variant="contained" color="success">
              登录
            </Button>
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default Home;
