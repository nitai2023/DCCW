import React from 'react';
import { Button } from '@mui/material';
import { HashRouter as Router, Link } from 'react-router-dom';
// 主页
function Home() {
  return (
    <Router>
      <div>
        <h1>逐梦校园管理端</h1>
        <Link to="/Login">
          <Button variant="contained">登录</Button>
        </Link>
      </div>
    </Router>
  );
}

export default Home;
